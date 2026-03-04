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

  const ranges = {
    Age: [1, 120],
    Cholesterol: [100, 400],
    Systolic_BP: [70, 200],
    Diastolic_BP: [40, 130],
    HeartRate: [40, 200],
    ExerciseHoursPerWeek: [0, 40],
    StressLevel: [1, 10],
    BMI: [10, 60],
    SleepHoursPerDay: [0, 24],
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateField = (name, value) => {
    let error = "";

    if (value < 0) {
      error = "Value cannot be negative";
    } else if (
      ranges[name] &&
      (value < ranges[name][0] || value > ranges[name][1])
    ) {
      error = `Value must be between ${ranges[name][0]} and ${ranges[name][1]}`;
    }

    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleInputChange = (name, value) => {
    if (value < 0) return;

    setForm({
      ...form,
      [name]: value,
    });

    validateField(name, Number(value));
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
    setApiError("");

    if (!validateFields()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/heart/heart-predict",
        form,
        { withCredentials: true }
      );

      const mappedResult = {
        label: res.data.prediction,
        risk_probability: res.data.confidence,
        suggestions: res.data.suggestions || [],
      };

      navigate("/heart-result", { state: { result: mappedResult } });
    } catch (error) {
      console.error("AXIOS ERROR:", error);
      console.log("BACKEND RESPONSE DATA:", error.response?.data);

      setApiError(
        error.response?.data?.message ||
          "Something went wrong while predicting."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setApiError("");
    setFieldErrors({});
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: "Age", name: "Age" },
            { label: "Sex", name: "Sex", type: "selectSex" },
            { label: "Cholesterol", name: "Cholesterol" },
            { label: "Systolic Blood Pressure", name: "Systolic_BP" },
            { label: "Diastolic Blood Pressure", name: "Diastolic_BP" },
            { label: "Heart Rate", name: "HeartRate" },
            { label: "Exercise Hours per Week", name: "ExerciseHoursPerWeek" },
            { label: "Stress Level", name: "StressLevel" },
            { label: "BMI", name: "BMI" },
            { label: "Sleep Hours per Day", name: "SleepHoursPerDay" },
          ].map((field, index) => (
            <div key={index}>
              <label className="text-gray-700 font-medium block mb-1">
                {field.label} <span className="text-red-500">*</span>

                {ranges[field.name] && (
                  <span className="text-gray-600 text-sm ml-2">
                    ({ranges[field.name][0]} - {ranges[field.name][1]})
                  </span>
                )}
              </label>

              {field.type === "selectSex" ? (
                <select
                  name="Sex"
                  value={form.Sex}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg mb-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <>
                  <input
                    type="number"
                    value={form[field.name]}
                    min={ranges[field.name]?.[0]}
                    max={ranges[field.name]?.[1]}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className={`w-full border p-2 rounded-lg mb-2 transition ${
                      fieldErrors?.[field.name]
                        ? "border-red-500 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-indigo-500"
                    }`}
                    required
                  />

                  {ranges[field.name] && (
                    <input
                      type="range"
                      min={ranges[field.name][0]}
                      max={ranges[field.name][1]}
                      value={form[field.name] || ranges[field.name][0]}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      className="w-full accent-black cursor-pointer"
                    />
                  )}
                </>
              )}

              {fieldErrors?.[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="md:col-span-2 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Medical & Lifestyle Indicators
            </h2>
          </div>

          {[
            { label: "Diabetes", name: "Diabets" },
            { label: "Family History of Heart Disease", name: "FamilyHistory" },
            { label: "Smoking", name: "Smoking" },
            { label: "Obesity", name: "Obesity" },
            { label: "Alcohol Consumption", name: "AlcoholConsumption" },
            { label: "Previous Health Problems", name: "PreviousHealthProblem" },
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

          {apiError && (
            <div className="md:col-span-2">
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {apiError}
              </p>
            </div>
          )}

          <div className="md:col-span-2 mt-6 flex flex-col md:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl shadow hover:bg-red-700 transition disabled:opacity-60"
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