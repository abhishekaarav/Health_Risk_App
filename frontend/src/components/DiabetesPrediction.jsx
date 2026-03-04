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
  const [fieldErrors, setFieldErrors] = useState({});

  /* REAL WORLD MEDICAL RANGES */
  const ranges = {
    Pregnancies: [0, 20],
    Glucose: [50, 300],
    DiastolicBP: [40, 130],
    SkinThickness: [0, 100],
    Insulin: [0, 900],
    BMI: [10, 70],
    DiabetesPedigreeFunction: [0, 1],   
    Age: [1, 120],
  };

  const validateFields = () => {
    let errors = {};

    Object.keys(ranges).forEach((key) => {
      const value = Number(form[key]);

      if (value < 0) {
        errors[key] = "Value cannot be negative";
      } else if (value < ranges[key][0] || value > ranges[key][1]) {
        errors[key] = `Value must be between ${ranges[key][0]} and ${ranges[key][1]}`;
      }
    });

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="w-full h-full bg-white/30 backdrop-blur-xl shadow-2xl p-10 border border-white/40 rounded-none">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Diabetes Risk Prediction
        </h1>

        {!result ? (
          <DiabetesForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            loading={loading}
            fieldErrors={fieldErrors}
            ranges={ranges}
            setFieldErrors={setFieldErrors}
           />
        ) : (
          <DiabetesResult result={result} onBack={() => setResult(null)} />
        )}
      </div>
    </div>
  );
}