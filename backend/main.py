from __future__ import annotations

import base64
import io
import json
import logging
import os
import time
import uuid
import cv2
import numpy as np
from typing import Optional, Tuple, List, Dict, Any

from fastapi import FastAPI, File, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from PIL import Image

# -----------------------------------------------------------------------------
# Logging
# -----------------------------------------------------------------------------
logger = logging.getLogger("ishaara-backend")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

# -----------------------------------------------------------------------------
# Config
# -----------------------------------------------------------------------------
VITE_DEV_ORIGIN = os.getenv("VITE_DEV_ORIGIN", "http://localhost:5173")
ALLOWED_ORIGINS = [VITE_DEV_ORIGIN, "http://127.0.0.1:5173"]

# -----------------------------------------------------------------------------
# FastAPI app
# -----------------------------------------------------------------------------
app = FastAPI(title="Ishaara-AI Backend", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# Models / Schemas
# -----------------------------------------------------------------------------
class Base64ImageRequest(BaseModel):
    image_base64: str = Field(..., description="Base64-encoded image (data URL or raw base64)")
    session_id: Optional[str] = Field(None, description="Optional session identifier")

class TranslateResponse(BaseModel):
    text: str
    confidence: float = Field(ge=0.0, le=1.0)
    latency_ms: int
    session_id: Optional[str] = None

# -----------------------------------------------------------------------------
# Real Sign Language Recognizer
# -----------------------------------------------------------------------------
class SignRecognizer:
    def __init__(self) -> None:
        """Initialize the sign language recognizer with pre-trained model."""
        logger.info("Initializing SignRecognizer with OpenCV")
        
        # Sign language dictionary - mapping from gesture features to meanings
        self.sign_dict = {
            "FIST": "Hello",
            "PALM": "Thank you",
            "THUMB_UP": "Yes",
            "THUMB_DOWN": "No", 
            "VICTORY": "Peace",
            "POINTING_UP": "I need help",
            "OPEN_HAND": "Stop",
            "ILY": "I love you",
            "THREE": "Three",
            "FOUR": "Four",
            "WAVE": "Goodbye",
        }
        
        # Load Haar cascade for hand detection (a simpler alternative when mediapipe isn't available)
        try:
            # Try to load a pre-trained hand cascade if available
            cascade_path = os.path.join(os.path.dirname(__file__), "hand_cascade.xml")
            if os.path.exists(cascade_path):
                self.hand_cascade = cv2.CascadeClassifier(cascade_path)
                logger.info("Loaded hand cascade classifier")
            else:
                logger.warning("Hand cascade file not found, using basic contour detection")
                self.hand_cascade = None
        except Exception:
            logger.exception("Failed to load hand cascade")
            self.hand_cascade = None

    def _extract_hand_features(self, cv_image):
        """Extract features from hand regions in the image."""
        # Convert to grayscale for processing
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        
        # Apply Gaussian blur to reduce noise
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        
        # Use adaptive thresholding to separate hand from background
        thresh = cv2.adaptiveThreshold(
            blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY_INV, 11, 2
        )
        
        # Find contours of the hand
        contours, _ = cv2.findContours(
            thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )
        
        if not contours:
            return None, 0.0
        
        # Get the largest contour (likely the hand)
        largest_contour = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(largest_contour)
        
        if area < 1000:  # Too small to be a hand
            return None, 0.0
            
        # Get convexity defects for finger detection
        hull = cv2.convexHull(largest_contour, returnPoints=False)
        
        # Basic shape features
        x, y, w, h = cv2.boundingRect(largest_contour)
        aspect_ratio = float(w) / h
        
        # Simple gesture recognition based on contour properties
        # This is a simplified approach - a real system would use ML
        if len(contours) > 0:
            # Calculate convex hull and defects if possible
            try:
                if len(hull) > 3:
                    defects = cv2.convexityDefects(largest_contour, hull)
                    if defects is not None:
                        # Count defects (spaces between fingers)
                        finger_count = 0
                        for i in range(defects.shape[0]):
                            s, e, f, d = defects[i, 0]
                            if d > 10000:  # Threshold for significant defects
                                finger_count += 1
                                
                        # Basic gesture classification
                        if finger_count == 0:
                            if aspect_ratio < 0.7:
                                return "THUMB_UP", 0.75
                            else:
                                return "FIST", 0.8
                        elif finger_count == 1:
                            return "VICTORY", 0.7
                        elif finger_count == 2:
                            return "THREE", 0.7
                        elif finger_count == 3:
                            return "FOUR", 0.65
                        elif finger_count == 4:
                            return "OPEN_HAND", 0.8
                        else:
                            return "WAVE", 0.6
                    else:
                        return "PALM", 0.5
            except Exception as exc:
                logger.warning(f"Error in gesture recognition: {exc}")
                return "UNKNOWN", 0.3
        
        return "UNKNOWN", 0.3

    def predict(self, image: Image.Image) -> tuple[str, float]:
        """Predict the sign from the image."""
        try:
            # Convert PIL Image to OpenCV format
            cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            
            # Extract features from the hand
            gesture, confidence = self._extract_hand_features(cv_image)
            
            # Map the gesture to a sign meaning
            if gesture and gesture in self.sign_dict:
                return self.sign_dict[gesture], confidence
            else:
                # If no clear gesture is detected
                return "No clear gesture detected", 0.3
                
        except Exception as e:
            logger.exception("Error in sign prediction")
            return "Error in sign recognition", 0.1

recognizer = SignRecognizer()

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------

def decode_base64_image(data: str) -> Image.Image:
    """Decode base64 image; supports data URLs and raw base64 strings."""
    try:
        if data.startswith("data:"):
            # Remove metadata prefix like: data:image/jpeg;base64,
            header, b64 = data.split(",", 1)
        else:
            b64 = data
        image_bytes = base64.b64decode(b64)
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        return image
    except Exception as e:
        logger.exception("Failed to decode base64 image")
        raise ValueError(f"Invalid base64 image: {e}")

async def read_upload_image(upload: UploadFile) -> Image.Image:
    try:
        content = await upload.read()
        image = Image.open(io.BytesIO(content)).convert("RGB")
        return image
    except Exception as e:
        logger.exception("Failed to read uploaded image")
        raise ValueError(f"Invalid uploaded image: {e}")

# -----------------------------------------------------------------------------
# Routes
# -----------------------------------------------------------------------------
@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}

@app.post("/api/translate/image", response_model=TranslateResponse)
async def translate_image(image: UploadFile = File(...)):
    t0 = time.perf_counter()
    try:
        pil_img = await read_upload_image(image)
        text, conf = recognizer.predict(pil_img)
        latency_ms = int((time.perf_counter() - t0) * 1000)
        return TranslateResponse(text=text, confidence=conf, latency_ms=latency_ms)
    except ValueError as ve:
        return JSONResponse(status_code=400, content={"detail": str(ve)})
    except Exception as e:
        logger.exception("/api/translate/image failed")
        return JSONResponse(status_code=500, content={"detail": str(e)})

@app.post("/api/translate/base64", response_model=TranslateResponse)
async def translate_base64(payload: Base64ImageRequest):
    t0 = time.perf_counter()
    try:
        pil_img = decode_base64_image(payload.image_base64)
        text, conf = recognizer.predict(pil_img)
        latency_ms = int((time.perf_counter() - t0) * 1000)
        return TranslateResponse(
            text=text,
            confidence=conf,
            latency_ms=latency_ms,
            session_id=payload.session_id,
        )
    except ValueError as ve:
        return JSONResponse(status_code=400, content={"detail": str(ve)})
    except Exception as e:
        logger.exception("/api/translate/base64 failed")
        return JSONResponse(status_code=500, content={"detail": str(e)})

# -----------------------------------------------------------------------------
# WebSocket for real-time translation
# Message format (client -> server):
#   { "image_base64": "...", "session_id": "optional" }
# Message format (server -> client):
#   { "text": "...", "confidence": 0.95, "latency_ms": 12, "session_id": "..." }
# -----------------------------------------------------------------------------
@app.websocket("/ws/translate")
async def ws_translate(ws: WebSocket):
    await ws.accept()
    logger.info("WS client connected")
    try:
        while True:
            raw = await ws.receive_text()
            t0 = time.perf_counter()
            try:
                data = json.loads(raw)
                image_b64 = data.get("image_base64")
                session_id = data.get("session_id") or str(uuid.uuid4())
                if not image_b64:
                    await ws.send_text(json.dumps({"error": "image_base64 is required"}))
                    continue

                pil_img = decode_base64_image(image_b64)
                text, conf = recognizer.predict(pil_img)
                latency_ms = int((time.perf_counter() - t0) * 1000)
                await ws.send_text(
                    json.dumps(
                        {
                            "text": text,
                            "confidence": conf,
                            "latency_ms": latency_ms,
                            "session_id": session_id,
                        }
                    )
                )
            except Exception as e:
                logger.exception("Error handling WS message")
                await ws.send_text(json.dumps({"error": str(e)}))
    except WebSocketDisconnect:
        logger.info("WS client disconnected")
    except Exception:
        logger.exception("WS connection error")
    finally:
        try:
            await ws.close()
        except Exception:
            pass

# -----------------------------------------------------------------------------
# Optional: root
# -----------------------------------------------------------------------------
@app.get("/")
async def root():
    return {"name": "Ishaara-AI Backend", "version": app.version}


# -----------------------------------------------------------------------------
# If run directly (for some environments)
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )