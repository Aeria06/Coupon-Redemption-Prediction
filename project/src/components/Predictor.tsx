import React, { useEffect, useMemo, useState } from 'react';

type SampleRow = Record<string, string | number | boolean | null> & { id?: number };

type PredictResponse = {
  prediction: number | string;
  probability?: number;
};

export default function Predictor() {
  const [samples, setSamples] = useState<SampleRow[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadingSamples, setLoadingSamples] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        setLoadingSamples(true);
        setError(null);
        const res = await fetch('/api/samples');
        if (!res.ok) throw new Error(`Failed to fetch samples: ${res.status}`);
        const data = await res.json();
        setSamples(data.samples || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load samples');
      } finally {
        setLoadingSamples(false);
      }
    };
    fetchSamples();
  }, []);

  const columns = useMemo(() => {
    if (samples.length === 0) return [] as string[];
    const keys = Object.keys(samples[0] || {});
    return keys.slice(0, Math.min(keys.length, 8));
  }, [samples]);

  const handlePredict = async () => {
    if (selectedIndex === null) return;
    try {
      setPredicting(true);
      setError(null);
      setResult(null);
      const payload = { row: samples[selectedIndex] };
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Prediction failed: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Prediction failed');
    } finally {
      setPredicting(false);
    }
  };

  return (
    <section id="predict" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Try the Model</h2>
          <p className="text-gray-600">Pick a sample row from the test dataset and click Predict.</p>
        </div>

        <div className="max-w-5xl mx-auto mb-6">
          <div className="bg-blue-50 border border-blue-100 text-blue-900 rounded-lg p-4 md:p-5 text-sm leading-relaxed">
            <div className="font-semibold mb-1">What this prediction means</div>
            <p className="mb-2">Each row represents a customer-campaign snapshot with engineered features (purchase history, product mix, campaign timing, etc.). When you click PREDICT, the trained model estimates the likelihood that this customer will <span className="font-semibold">redeem the coupon</span> if targeted.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold">Prediction</span>: 1 = likely to redeem, 0 = unlikely to redeem.</li>
              <li><span className="font-semibold">Probability</span>: the model’s confidence for redemption (class 1). Higher % suggests stronger uplift potential.</li>
            </ul>
            <p className="mt-2">In a business setting, you can use this to prioritize who receives coupons, focusing spend on customers with higher redemption likelihood to maximize ROI.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          {loadingSamples ? (
            <div className="text-center py-10 text-gray-500">Loading samples...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">{error}</div>
          ) : samples.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No samples available.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-3 py-2 text-left">Select</th>
                    {columns.map((col) => (
                      <th key={col} className="px-3 py-2 text-left whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {samples.map((row, idx) => (
                    <tr key={idx} className={idx === selectedIndex ? 'bg-blue-50' : ''}>
                      <td className="px-3 py-2">
                        <input
                          type="radio"
                          name="row"
                          checked={idx === selectedIndex}
                          onChange={() => setSelectedIndex(idx)}
                        />
                      </td>
                      {columns.map((col) => (
                        <td key={col} className="px-3 py-2 whitespace-nowrap text-gray-800">
                          {String((row as any)[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              disabled={selectedIndex === null || predicting}
              onClick={handlePredict}
              className="px-6 py-3 bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-semibold"
            >
              {predicting ? 'Predicting...' : 'PREDICT'}
            </button>
            {result && (
              <div className="text-gray-800">
                <span className="font-semibold mr-1">Prediction:</span>
                <span className="mr-4">{String(result.prediction)}</span>
                {typeof result.probability === 'number' && (
                  <>
                    <span className="font-semibold mr-1">Probability:</span>
                    <span>{(result.probability * 100).toFixed(2)}%</span>
                  </>
                )}
              </div>
            )}
          </div>

          {result && (
            <div className="mt-4 max-w-3xl">
              <div className="rounded-lg border border-gray-200 p-4 bg-gray-50 text-sm leading-relaxed">
                <div className="font-semibold mb-1">Business interpretation</div>
                {typeof result.probability === 'number' ? (
                  <p>
                    The model estimates a { (result.probability * 100).toFixed(1) }% chance this customer will redeem the coupon.
                    If your campaign cost per coupon is lower than the expected margin uplift for this customer, targeting them is likely profitable.
                  </p>
                ) : (
                  <p>
                    The model predicts class { String(result.prediction) }. Use this classification to prioritize coupon allocation toward predicted class 1 customers for higher expected ROI.
                  </p>
                )}
                <p className="mt-2 text-gray-600">Note: Scores are probabilistic, not guarantees. Consider business constraints (budget, inventory, fairness) alongside the score.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


