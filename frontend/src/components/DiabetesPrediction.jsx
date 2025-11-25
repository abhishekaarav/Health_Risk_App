import React, { useState } from "react";
import DiabetesForm from "../components/DiabetesForm";
import DiabetesResult from "../components/DiabetesResult";
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
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/disease/diabetes-predict",
        form,
        { withCredentials: true }
      );

      setResult(res.data);
    } catch (error) {
      alert("Prediction failed! Check server.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 ">
      <div className="max-w-full mx-auto bg-white/30 backdrop-blur-xl shadow-2xl  p-10 border border-white/40">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Diabetes Risk Prediction
        </h1>

        {!result ? (
          <DiabetesForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          <DiabetesResult result={result} onBack={() => setResult(null)} />
        )}
      </div>
    </div>
  );
}
