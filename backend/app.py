from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os

# Import detector functions
from utils.detector import load_model, load_labels, predict_letter

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and labels at startup
model = load_model()
labels = load_labels()

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({"status": "running"})

@app.route('/predict', methods=['POST'])
def predict():
    """Predict the sign language letter from an image."""
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({"error": "No image provided in request"}), 400

        image_data = data['image']
        # Handle base64 data URL (data:image/jpeg;base64,...)
        if ',' in image_data:
            image_data = image_data.split(',')[1]

        # Decode base64
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image data"}), 400

        letter = predict_letter(image, model, labels)
        if letter:
            return jsonify({"letter": letter})
        else:
            return jsonify({"letter": None})  # No hand detected or low confidence

    except Exception as e:
        app.logger.error(f"Error in /predict: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/stream', methods=['GET'])
def stream():
    """Placeholder for stream endpoint (for debugging/preview)."""
    return jsonify({"message": "Stream endpoint - implement video streaming if needed"})

if __name__ == '__main__':
    # Ensure we're in the correct directory
    os.chdir(os.path.dirname(__file__))
    app.run(debug=True, host='0.0.0.0', port=5000)