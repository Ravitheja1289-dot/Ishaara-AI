# Ishaara AI Backend

This is the Flask backend for the Ishaara AI sign language recognition system.

## Features

- Real-time sign language letter prediction using MediaPipe and TensorFlow
- REST API endpoints for prediction and health checks
- Auto-downloads pretrained model from GitHub
- Supports A-Z letter recognition

## Setup Instructions

1. **Navigate to the backend directory:**
   ```
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/Mac:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the server:**
   ```
   python app.py
   ```

   The server will start on `http://localhost:5000`

## API Endpoints

- `GET /health`: Check if the backend is running
- `POST /predict`: Predict a letter from an image
  - Request body: `{"image": "base64_encoded_image"}`
  - Response: `{"letter": "A"}` or `{"letter": null}` if no hand detected
- `GET /stream`: Placeholder for future video streaming

## Testing

- Health check: `curl http://localhost:5000/health`
- Prediction: Send a POST request with a base64 encoded image of a hand sign

## Requirements

- Python 3.8+
- Webcam access (for frontend integration)
- Internet connection for initial model download

## Model

The backend uses a pretrained MLP model trained on MediaPipe hand landmarks from the ASL Alphabet dataset. The model is automatically downloaded on first run.

## Integration with Frontend

The React frontend should capture webcam frames, encode them as base64, and send POST requests to `/predict` for real-time predictions. Use polling or WebSocket for continuous updates.