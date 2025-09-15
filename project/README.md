# Coupon Purchase Prediction Website

An interactive React + FastAPI app that demonstrates a trained model predicting whether a customer will redeem/purchase a coupon. Viewers can pick a sample row from the test dataset, click PREDICT, and see the predicted class and probability.

## Highlights
- Frontend: React + TypeScript + Vite + Tailwind
- Backend: FastAPI (Python)
- Model: Loaded from `xgb_model.pkl`
- Data: Samples from `test_features_processed.csv`
- UX: Select a sample row, click PREDICT, see class (0/1) and probability

## Repo Structure
```
project/
  src/                # React app (Vite)
    components/
      Predictor.tsx   # UI to select row and predict
      ...
  backend/
    main.py           # FastAPI app: /samples, /predict
  test_features_processed.csv
  xgb_model.pkl
  vite.config.ts      # Vite dev proxy → FastAPI
  package.json
```

## Prerequisites
- Node.js 18+
- Python 3.9+ (with venv)
- Windows PowerShell (or your shell of choice)

## Setup
1) Install frontend deps
```powershell
cd project
npm install
```

2) Create and activate Python venv, install backend deps
```powershell
python -m venv .venv
# If activation is blocked, run the policy change in this shell only
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
python -m pip install -U pip
pip install fastapi uvicorn pandas numpy scikit-learn xgboost
```

## Running Locally
Open two terminals in `project`:

- Terminal A: Backend (FastAPI)
```powershell
.\.venv\Scripts\Activate.ps1
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

- Terminal B: Frontend (Vite)
```powershell
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

Vite is configured to proxy `/api/*` to `http://127.0.0.1:8000` during development.

## What the prediction means
- Each row is a customer–campaign snapshot with engineered features.
- Clicking PREDICT sends the row’s features to the backend and uses the trained model to estimate whether the customer will redeem the coupon.
- Output:
  - Prediction: 1 = likely to redeem, 0 = unlikely to redeem
  - Probability: model confidence for redemption (class 1)

### Business interpretation
- Use higher probabilities to prioritize who should receive coupons and maximize ROI.
- Simple rule of thumb: if (expected margin uplift × probability) > coupon cost, target the customer.
- Scores are probabilistic. Combine with budget, inventory, business rules, and fairness constraints.

## API Reference
- GET `/api/samples`
  - Returns a small set of sample rows from `test_features_processed.csv`.
  - Response: `{ "samples": Array<Record<string, any>> }`

- POST `/api/predict`
  - Body: `{ "row": { feature1: value, ... } }`
  - Response: `{ "prediction": 0|1, "probability"?: number }`

## Troubleshooting
- PowerShell activation error
  - Fix: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` then `.\.venv\Scripts\Activate.ps1`

- Frontend can’t reach backend
  - Ensure FastAPI is running on `127.0.0.1:8000`
  - Keep Vite running (`npm run dev`) so the `/api` proxy is active

- Prediction always returns 0
  - Common in imbalanced datasets; probabilities may be low but non-zero
  - Thresholding: the label uses a default 0.5 threshold; viewers can still use probability for ranking
  - Feature alignment: backend drops non-feature columns (like `id`) and aligns to model feature names when available
  - Ensure `test_features_processed.csv` columns match the training feature set

- Model loading warning for XGBoost
  - If you see a warning about loading pickled models, consider re-saving the model using `Booster.save_model` (see XGBoost docs) and adjust loading accordingly.

## Customization & Next Steps
- Add a threshold slider to convert probability → label based on business tolerance
- Pre-sort samples by predicted probability to surface likely positives
- Display top influential features for explainability (e.g., SHAP)
- Add input form to edit features and simulate “what-if” scenarios

## Scripts
- Start frontend: `npm run dev`
- Build frontend: `npm run build`
- Preview build: `npm run preview`

Tip: You can also store a Python-side `requirements.txt` if you prefer pinned versions for backend deployments.
