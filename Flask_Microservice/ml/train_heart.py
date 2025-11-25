import os
from pathlib import Path

import joblib
import numpy as pd
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_PATH = BASE_DIR / "data" / "heart_attack_prediction_dataset.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)


def load_and_preprocess():
    df = pd.read_csv(DATA_PATH)

    # Split "Blood Pressure" (e.g., "158/88") into two numeric columns
    bp_split = df["Blood Pressure"].str.split("/", expand=True)
    df["Systolic_BP"] = pd.to_numeric(bp_split[0], errors="coerce")
    df["Diastolic_BP"] = pd.to_numeric(bp_split[1], errors="coerce")
    df.drop(columns=["Blood Pressure"], inplace=True)

    # Target
    y = df["Heart Attack Risk"]
    X = df.drop(columns=["Heart Attack Risk"])

    return X, y


def build_pipeline(X: pd.DataFrame):
    categorical_features = ["Sex", "Diet"]
    numeric_features = [col for col in X.columns if col not in categorical_features]

    numeric_transformer = Pipeline(
        steps=[
            ("scaler", StandardScaler()),
        ]
    )

    categorical_transformer = OneHotEncoder(handle_unknown="ignore")

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features),
        ]
    )

    clf = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        class_weight="balanced",
        n_jobs=-1,
    )

    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("clf", clf),
        ]
    )

    return pipeline


def train_and_save():
    print(f"Loading data from: {DATA_PATH}")
    X, y = load_and_preprocess()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    pipeline = build_pipeline(X)
    print("Training heart attack risk model...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Heart model accuracy: {acc:.4f}")
    print("Classification report:")
    print(classification_report(y_test, y_pred))

    model_path = MODEL_DIR / "heart_model.pkl"
    joblib.dump(pipeline, model_path)
    print(f"Saved heart model to: {model_path}")


if __name__ == "__main__":
    train_and_save()
