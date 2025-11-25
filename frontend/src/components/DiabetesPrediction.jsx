// DiabetesPrediction.jsx
import React, { useState } from "react";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // allow decimals for some fields, keep value as string for controlled input
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // SEND TO NODE BACKEND → NODE → FLASK
      const response = await axios.post(
        "http://localhost:5000/api/disease/diabetes-predict",
        form,
        { withCredentials: true }
      );

      console.log("🔥 FULL PREDICTION RESPONSE:");
      console.log(response.data);

      alert(
        `Prediction: ${response.data.prediction}\nConfidence: ${response.data.confidence}`
      );
    } catch (error) {
      console.error("❌ Prediction Error:", error);
      alert("Prediction failed! Check backend/flask server.");
    }

    setLoading(false);
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
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

          <div className="md:col-span-2 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
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
