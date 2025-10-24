import os
import requests
import cv2
import numpy as np
import tensorflow as tf
import mediapipe as mp

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.5
)

def load_model():
    """Load the pretrained ASL model, download if not present."""
    model_path = os.path.join('model', 'asl_mediapipe_mlp_model.h5')
    if not os.path.exists(model_path):
        print("Downloading pretrained model...")
        download_url = 'https://raw.githubusercontent.com/JaspreetSingh-exe/Sign-Language-Recognition-System/main/SIGN_TO_SENTENCE_PROJECT/asl_mediapipe_mlp_model.h5'
        try:
            response = requests.get(download_url, timeout=30)
            response.raise_for_status()
            with open(model_path, 'wb') as f:
                f.write(response.content)
            print("Model downloaded successfully.")
        except Exception as e:
            raise RuntimeError(f"Failed to download model: {e}")
    else:
        print("Model already exists.")
    model = tf.keras.models.load_model(model_path)
    return model

def load_labels():
    """Load the labels from labels.txt."""
    labels_path = 'labels.txt'
    with open(labels_path, 'r') as f:
        labels = [line.strip() for line in f.readlines()]
    return labels

def extract_landmarks(image):
    """Extract hand landmarks from the image using MediaPipe."""
    # Convert BGR to RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(image_rgb)

    if results.multi_hand_landmarks:
        # Take the first hand
        hand_landmarks = results.multi_hand_landmarks[0]
        landmarks = []
        for lm in hand_landmarks.landmark:
            landmarks.extend([lm.x, lm.y, lm.z])
        return np.array(landmarks, dtype=np.float32)
    return None

def predict_letter(image, model, labels):
    """Predict the letter from the image."""
    landmarks = extract_landmarks(image)
    if landmarks is not None and len(landmarks) == 63:  # 21 landmarks * 3
        input_data = landmarks.reshape(1, -1)
        prediction = model.predict(input_data, verbose=0)
        predicted_index = np.argmax(prediction)
        if predicted_index < len(labels):
            letter = labels[predicted_index]
            # Only return A-Z letters, ignore other classes if any
            if letter.isalpha() and letter.isupper():
                return letter
    return None