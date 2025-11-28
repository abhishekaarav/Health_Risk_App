import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HeartPrediction() {
  const navigate = useNavigate();

  const initialState = {
    Age: "",
    Sex: "",
    Cholesterol: "",
    Systolic_BP: "",
    Diastolic_BP: "",
    HeartRate: "",
    Diabets: false,
    FamilyHistory: false,
    Smoking: false,
    Obesity: false,
    AlcoholConsumption: false,
    ExerciseHoursPerWeek: "",
    Diet: "",
    PreviousHealthProblem: false,
    MedicationUse: false,
    StressLevel: "",
    BMI: "",
    SleepHoursPerDay: "",
    Meditation: false,
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/heart/heart-predict",
        form,
        {
          withCredentials: true,
        }
      );

      const mappedResult = {
        label: res.data.prediction,
        risk_probability: res.data.confidence,
        suggestions: res.data.suggestions || [],
      };

      // ✅ Alag page pe navigate + result bhejna
      navigate("/heart-result", { state: { result: mappedResult } });
    } catch (error) {
      console.error("AXIOS ERROR:", error);
      console.log("BACKEND RESPONSE DATA:", error.response?.data);

      setApiError(
        error.response?.data?.message ||
          "Something went wrong while predicting. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setApiError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Heart Attack Risk Prediction
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Fill the details below and get your heart risk analyzed instantly.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: "Age", type: "number", name: "Age" },
            { label: "Sex", type: "selectSex", name: "Sex" },
            {
              label: "Cholesterol (mg/dL)",
              type: "number",
              name: "Cholesterol",
            },
            {
              label: "Systolic Blood Pressure",
              type: "number",
              name: "Systolic_BP",
            },
            {
              label: "Diastolic Blood Pressure",
              type: "number",
              name: "Diastolic_BP",
            },
            { label: "Heart Rate (BPM)", type: "number", name: "HeartRate" },
            {
              label: "Exercise Hours per Week",
              type: "number",
              name: "ExerciseHoursPerWeek",
            },
            { label: "Diet Quality", type: "selectDiet", name: "Diet" },
            {
              label: "Stress Level (1–10)",
              type: "number",
              name: "StressLevel",
            },
            { label: "BMI", type: "number", name: "BMI" },
            {
              label: "Sleep Hours per Day",
              type: "number",
              name: "SleepHoursPerDay",
            },
          ].map((field, index) => (
            <div key={index}>
              <label className="text-gray-700 font-medium block mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>

              {/* SEX SELECT */}
              {field.type === "selectSex" && (
                <select
                  name="Sex"
                  value={form.Sex}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              )}

              {/* DIET SELECT */}
              {field.type === "selectDiet" && (
                <select
                  name="Diet"
                  value={form.Diet}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Diet Type</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Average">Average</option>
                  <option value="Unhealthy">Unhealthy</option>
                </select>
              )}

              {/* NORMAL INPUT */}
              {field.type !== "selectSex" && field.type !== "selectDiet" && (
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              )}
            </div>
          ))}

          {/* CHECKBOX SECTION */}
          <div className="md:col-span-2 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Medical & Lifestyle Indicators{" "}
              <span className="text-red-500">*</span>
            </h2>
          </div>

          {[
            { label: "Diabetes", name: "Diabets" },
            { label: "Family History of Heart Disease", name: "FamilyHistory" },
            { label: "Smoking", name: "Smoking" },
            { label: "Obesity", name: "Obesity" },
            { label: "Alcohol Consumption", name: "AlcoholConsumption" },
            {
              label: "Previous Health Problems",
              name: "PreviousHealthProblem",
            },
            { label: "Medication Use", name: "MedicationUse" },
            { label: "Meditation Habit", name: "Meditation" },
          ].map((field, index) => (
            <label
              key={index}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                name={field.name}
                checked={form[field.name]}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-gray-700">{field.label}</span>
            </label>
          ))}

          {/* ERROR MESSAGE */}
          {apiError && (
            <div className="md:col-span-2">
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {apiError}
              </p>
            </div>
          )}

          {/* SUBMIT + RESET */}
          <div className="md:col-span-2 mt-6 flex flex-col md:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Predicting..." : "Predict Heart Attack Risk"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl border hover:bg-gray-200 transition"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
