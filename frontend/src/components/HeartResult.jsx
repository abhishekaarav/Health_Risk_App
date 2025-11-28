import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HeartResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  // Agar koi direct /heart-result pe aa jaye bina data ke
  useEffect(() => {
    if (!result) {
      navigate("/heart-predict");
    }
  }, [result, navigate]);

  if (!result) return null;

  const { label, risk_probability, suggestions = [] } = result;
  const percentage = Math.round((risk_probability || 0) * 100);

  const getRiskColor = () => {
    if (percentage < 35) return "text-green-600 bg-green-50 border-green-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getBarBg = () => {
    if (percentage < 35) return "bg-green-500";
    return "bg-red-500";
  };

  const getRiskDescription = () => {
    if (percentage < 35)
      return "Your predicted risk is relatively low. Maintain a healthy lifestyle to keep it this way.";
    return "You are in the high risk category. Please consult a doctor as soon as possible and follow medical advice.";
  };

  const handleNewPrediction = () => {
    navigate("/heart-predict");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Heart Risk Analysis Result
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Based on your provided health data, here is your heart attack risk
          assessment.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* RISK SUMMARY CARD */}
          <div className="lg:col-span-1">
            <div
              className={`border rounded-2xl p-5 shadow-sm flex flex-col items-center text-center ${getRiskColor()}`}
            >
              <p className="text-sm font-medium uppercase tracking-wide mb-2">
                Overall Risk Category
              </p>
              <p className="text-3xl font-extrabold mb-1">{label}</p>
              <p className="text-sm opacity-80 mb-4">
                Model&apos;s predicted heart attack risk.
              </p>

              {/* Circular indicator */}
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
                <div
                  className="absolute inset-0 rounded-full border-8 border-t-transparent border-r-transparent border-b-transparent"
                  style={{
                    transform: `rotate(${(percentage / 100) * 360}deg)`,
                    transformOrigin: "center center",
                    transition: "transform 0.5s ease",
                  }}
                />
                <div className="absolute inset-3 rounded-full bg-white flex flex-col items-center justify-center">
                  <span className="text-xs text-gray-500">Risk</span>
                  <span className="text-xl font-bold">{percentage}%</span>
                </div>
              </div>

              <p className="text-xs text-gray-600">{getRiskDescription()}</p>
            </div>
          </div>

          {/* BAR + SUGGESTIONS */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="border rounded-2xl p-5 shadow-sm bg-gray-50">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Risk Probability (0–100%)
              </p>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-4 ${getBarBg()}`}
                  style={{ width: `${percentage}%`, transition: "width 0.5s" }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0%</span>
                <span>{percentage}%</span>
                <span>100%</span>
              </div>

              <div className="flex flex-wrap gap-3 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Low (&lt; 35%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span>High (&gt; 35%)</span>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-5 shadow-sm bg-white">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Recommended Next Steps
              </p>
              {suggestions.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  {suggestions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No suggestions provided by the model.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-end mt-2">
              <button
                onClick={handleNewPrediction}
                className="px-4 py-2 rounded-lg border bg-gray-50 text-gray-700 text-sm font-semibold hover:bg-gray-100"
              >
                New Prediction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
