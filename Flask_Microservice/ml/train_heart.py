import joblib
import numpy as np
import pandas as pd
from pathlib import Path

from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline  # IMPORTANT: imblearn pipeline

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_PATH = BASE_DIR / "data" / "heart_attack_prediction_dataset.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)


def load_and_preprocess():
    df = pd.read_csv(DATA_PATH)

    # --- Split Blood Pressure "120/80" into two numeric columns ---
    bp_split = df["Blood Pressure"].str.split("/", expand=True)
    df["Systolic_BP"] = pd.to_numeric(bp_split[0], errors="coerce")
    df["Diastolic_BP"] = pd.to_numeric(bp_split[1], errors="coerce")
    df.drop(columns=["Blood Pressure"], inplace=True)

    # --- Clean Cholesterol (no unrealistic 0 values) ---
    df["Cholesterol"] = pd.to_numeric(df["Cholesterol"], errors="coerce")
    # In your dataset, median is 259 (we recomputed it)
    valid_chol = df.loc[df["Cholesterol"] > 0, "Cholesterol"]
    chol_median = float(valid_chol.median())
    print(f"Using Cholesterol median for cleaning: {chol_median:.2f}")

    # Replace 0 or negative with median
    df.loc[df["Cholesterol"] <= 0, "Cholesterol"] = chol_median

    y = df["Heart Attack Risk"]
    X = df.drop(columns=["Heart Attack Risk"])

    return X, y


def build_pipeline(X: pd.DataFrame):
    categorical_features = ["Sex", "Diet"]
    numeric_features = [col for col in X.columns if col not in categorical_features]

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", "passthrough", numeric_features),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features),
        ]
    )

    clf = RandomForestClassifier(
        n_estimators=400,
        random_state=42,
        class_weight="balanced_subsample",
        max_depth=14,
        min_samples_split=4,
        min_samples_leaf=3,
        n_jobs=-1,
    )

    # SMOTE inside pipeline (after preprocessing → all numeric)
    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("smote", SMOTE(random_state=42)),
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

    print("Training heart model with SMOTE in pipeline...")
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
