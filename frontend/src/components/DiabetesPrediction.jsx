// DiabetesPrediction.jsx
import React, { useState } from "react";
import axios from "axios";
import DiabetesResult from "./DiabetesResult"; // ensure this file exists (previous response)

export default function DiabetesPrediction() {
  const initialState = {
    Pregnancies: "",
    Glucose: "",
    DiastolicBP: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  };

  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // allow decimals for some fields, keep value as string for controlled input
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // simple validation: all fields required and numeric
    for (const key of Object.keys(initialState)) {
      const val = form[key];
      if (val === "" || val === null) {
        return `${key} is required.`;
      }
      if (isNaN(Number(val))) {
        return `${key} must be a number.`;
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // prepare numeric payload
    const payload = {};
    Object.keys(form).forEach((k) => {
      // convert to number (float)
      payload[k] = Number(form[k]);
    });

    setLoading(true);

    try {
      // --------- OPTION A: Actual backend call (uncomment & set URL) ----------
      // const response = await axios.post("http://localhost:5000/predict-diabetes", payload);
      // // expecting { result: { label, risk_probability, suggestions } }
      // setResult(response.data.result);

      // --------- OPTION B: Mock response (used when backend is not ready) -----
      await new Promise((res) => setTimeout(res, 700)); // small UX delay
      const mockResponse = {
        result: {
          label: "High",
          risk_probability: 0.7313999375935318,
          suggestions: [
            "Consult a healthcare professional as soon as possible.",
            "Get HbA1c and fasting blood sugar tests done.",
            "Follow a structured diet and exercise plan under supervision.",
          ],
        },
      };
      setResult(mockResponse.result);

    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "please check your backend or network."
      );
    } finally {
      setLoading(false);
    }
  };

  // If result exists, show the result component
  if (result) {
    return <DiabetesResult result={result} onBack={() => { setResult(null); setForm(initialState); setError(""); }} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Diabetes Risk Prediction
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Pregnancies", unit: "(count)", name: "Pregnancies" },
            { label: "Glucose Level", unit: "(mg/dL)", name: "Glucose" },
            { label: "Diastolic Blood Pressure", unit: "(mmHg)", name: "DiastolicBP" },
            { label: "Skin Thickness", unit: "(mm)", name: "SkinThickness" },
            { label: "Insulin Level", unit: "(IU/mL)", name: "Insulin" },
            { label: "BMI", unit: "(kg/m²)", name: "BMI" },
            { label: "Diabetes Pedigree Function", unit: "", name: "DiabetesPedigreeFunction" },
            { label: "Age", unit: "(years)", name: "Age" },
          ].map((field, index) => (
            <div key={index}>
              <label className="text-gray-700 font-medium block mb-1">
                {field.label} <span className="text-gray-500">{field.unit}</span>{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                step={field.name === "Pregnancies" || field.name === "Age" ? "1" : "any"}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                min="0"
              />
            </div>
          ))}

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2 mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 ${
                loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold rounded-xl shadow transition`}
            >
              {loading ? "Predicting..." : "Predict Diabetes Risk"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Tip: Ensure values are realistic. If you have a backend, uncomment the axios call and set the correct endpoint.
        </p>
      </div>
    </div>
  );
}
