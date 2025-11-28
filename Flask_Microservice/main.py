from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"

diabetes_model_path = MODEL_DIR / "diabetes_model.pkl"
heart_model_path = MODEL_DIR / "heart_model.pkl"

diabetes_model = joblib.load(diabetes_model_path)
heart_model = joblib.load(heart_model_path)

app = Flask(__name__)

def map_diabetes_label(prob: float) -> str:
    """
    Map probability (0–1) to risk label.
    You can tweak thresholds if you want.
    """
    if prob < 0.35:
        return "Low"
    elif prob < 0.55:
        return "Medium"
    else:
        return "High"
    
def map_heart_label(prob: float) -> str:
    """
    Map probability (0–1) to risk label.
    You can tweak thresholds if you want.
    """
    if prob < 0.35:
        return "Low"
    else:
        return "High"


def get_diabetes_suggestions(label: str) -> list[str]:
    if label == "Low":
        return [
            "Maintain a balanced diet with controlled sugar intake.",
            "Continue regular physical activity.",
            "Keep monitoring your blood glucose at recommended intervals.",
        ]
    elif label == "Medium":
        return [
            "Consider consulting a doctor for a preventive check-up.",
            "Increase physical activity and focus on weight management.",
            "Reduce refined carbs and sugary drinks.",
        ]
    else:  # High
        return [
            "Consult a healthcare professional as soon as possible.",
            "Get HbA1c and fasting blood sugar tests done.",
            "Follow a structured diet and exercise plan under supervision.",
        ]


def get_heart_suggestions(label: str) -> list[str]:
    if label == "Low":
        return [
            "Maintain a heart-healthy diet rich in fruits and vegetables.",
            "Continue regular cardio exercise (e.g., walking, jogging).",
            "Avoid smoking and limit alcohol intake.",
        ]
    else:  # High
        return [
            "Consult a cardiologist at the earliest.",
            "Strictly monitor blood pressure, cholesterol, and blood sugar.",
            "Avoid heavy exertion until cleared by a doctor.",
        ]


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "ML microservice running"})


@app.route("/predict/diabetes", methods=["POST"])
def predict_diabetes():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400

    try:
        df = pd.DataFrame([data])

        proba = float(diabetes_model.predict_proba(df)[0, 1])
        label = map_diabetes_label(proba)
        suggestions = get_diabetes_suggestions(label)

        return jsonify(
            {
                "result": {
                    "risk_probability": proba,
                    "label": label,
                    "suggestions": suggestions,
                }
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/predict/heart", methods=["POST"])
def predict_heart():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400

    try:
        df = pd.DataFrame([data])

        proba = float(heart_model.predict_proba(df)[0, 1])
        label = map_heart_label(proba)
        suggestions = get_heart_suggestions(label)

        return jsonify(
            {
                "result": {
                    "risk_probability": proba,
                    "label": label,
                    "suggestions": suggestions,
                }
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
