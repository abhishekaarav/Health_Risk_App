import os
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


BASE_DIR = Path(__file__).resolve().parents[1] 
DATA_PATH = BASE_DIR / "data" / "diabetes.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)


def load_data():
    df = pd.read_csv(DATA_PATH)
    y = df["Outcome"]
    X = df.drop(columns=["Outcome"])
    return X, y


def build_pipeline():
    pipeline = Pipeline(
        steps=[
            ("scaler", StandardScaler()),
            ("clf", LogisticRegression(max_iter=1000)),
        ]
    )
    return pipeline


def train_and_save():
    print(f"Loading data from: {DATA_PATH}")
    X, y = load_data()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    pipeline = build_pipeline()
    print("Training diabetes model...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Diabetes model accuracy: {acc:.4f}")
    print("Classification report:")
    print(classification_report(y_test, y_pred))

    model_path = MODEL_DIR / "diabetes_model.pkl"
    joblib.dump(pipeline, model_path)
    print(f"Saved diabetes model to: {model_path}")


if __name__ == "__main__":
    train_and_save()
