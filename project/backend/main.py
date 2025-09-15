import os
import json
from typing import Any, Dict, List

import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import xgboost as xgb
import pickle

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(ROOT_DIR, '..'))

MODEL_PATH = os.path.join(PROJECT_DIR, 'xgb_model.pkl')
TEST_PATH = os.path.join(PROJECT_DIR, 'test_features_processed.csv')

app = FastAPI(title="Coupon Predictor API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    row: Dict[str, Any]


def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
    with open(MODEL_PATH, 'rb') as f:
        return pickle.load(f)


SAMPLES_DF: pd.DataFrame | None = None

def load_samples(n: int = 15) -> List[Dict[str, Any]]:
    if not os.path.exists(TEST_PATH):
        raise FileNotFoundError(f"Test data not found at {TEST_PATH}")
    df = pd.read_csv(TEST_PATH)
    head = df.head(n)
    global SAMPLES_DF
    SAMPLES_DF = head.copy()
    return json.loads(head.to_json(orient='records'))


MODEL = None
SAMPLES: List[Dict[str, Any]] | None = None


@app.on_event("startup")
def startup_event():
    global MODEL, SAMPLES
    try:
        MODEL = load_model()
    except Exception as e:
        print(f"Failed to load model: {e}")
        MODEL = None
    try:
        SAMPLES = load_samples()
    except Exception as e:
        print(f"Failed to load samples: {e}")
        SAMPLES = []


@app.get("/samples")
def get_samples():
    if SAMPLES is None:
        return {"samples": []}
    return {"samples": SAMPLES}


EXTRA_NON_FEATURE_COLUMNS = {
    'id', 'ID', 'index', 'Index', 'Unnamed: 0', 'Unnamed: 0.1',
    'target', 'label', 'labels', 'redemption_status', 'y'
}


def _clean_and_align_features(df: pd.DataFrame, model: Any) -> pd.DataFrame:
    # Drop obvious non-feature columns if present
    drop_cols = [c for c in df.columns if c in EXTRA_NON_FEATURE_COLUMNS]
    if drop_cols:
        df = df.drop(columns=drop_cols)

    # Ensure numeric types where possible
    for c in df.columns:
        if df[c].dtype == object:
            df[c] = pd.to_numeric(df[c], errors='ignore')

    # If model exposes expected feature names, align strictly
    feature_names = getattr(model, 'feature_names_in_', None)
    if feature_names is not None:
        # Add missing as 0, and order to match
        missing = [c for c in feature_names if c not in df.columns]
        for c in missing:
            df[c] = 0
        df = df[feature_names]
        return df

    return df


@app.post("/predict")
def predict(req: PredictRequest):
    if MODEL is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    row = req.row
    if not isinstance(row, dict):
        raise HTTPException(status_code=400, detail="Invalid row format")

    df = pd.DataFrame([row])
    df = _clean_and_align_features(df, MODEL)

    try:
        # Handle sklearn-like models first
        if hasattr(MODEL, 'predict_proba'):
            proba = MODEL.predict_proba(df)  # type: ignore
            pred = int(np.argmax(proba[0]))
            prob1 = float(proba[0][1]) if proba.shape[1] > 1 else float(proba[0][0])
            return {"prediction": pred, "probability": prob1}
        # Handle xgboost.Booster models
        if isinstance(MODEL, xgb.Booster):
            dmatrix = xgb.DMatrix(df)
            proba = MODEL.predict(dmatrix)
            # If multiclass, proba is (n_samples, n_classes). If binary, (n_samples,)
            if len(proba.shape) == 1:
                prob1 = float(proba[0])
                pred = int(1 if prob1 >= 0.5 else 0)
                return {"prediction": pred, "probability": prob1}
            else:
                pred = int(np.argmax(proba[0]))
                prob1 = float(proba[0][1]) if proba.shape[1] > 1 else float(proba[0][0])
                return {"prediction": pred, "probability": prob1}
        else:
            pred = MODEL.predict(df)  # type: ignore
            pred_val = int(pred[0]) if isinstance(pred, (list, np.ndarray, pd.Series)) else int(pred)
            return {"prediction": pred_val}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)


