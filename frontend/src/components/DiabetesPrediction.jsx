import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
    alert("Diabetes Prediction Submitted!");
  };

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
          {/* Auto Generate Inputs */}
          {[
            { label: "Pregnancies", unit: "(count)", name: "Pregnancies" },
            { label: "Glucose Level", unit: "(mg/dL)", name: "Glucose" },
            {
              label: "Diastolic Blood Pressure",
              unit: "(mmHg)",
              name: "DiastolicBP",
            },
            { label: "Skin Thickness", unit: "(mm)", name: "SkinThickness" },
            { label: "Insulin Level", unit: "(IU/mL)", name: "Insulin" },
            { label: "BMI", unit: "(kg/m²)", name: "BMI" },
            {
              label: "Diabetes Pedigree Function",
              unit: "",
              name: "DiabetesPedigreeFunction",
            },
            { label: "Age", unit: "(years)", name: "Age" },
          ].map((field, index) => (
            <div key={index}>
              <label className="text-gray-700 font-medium block mb-1">
                {field.label}{" "}
                <span className="text-gray-500">{field.unit}</span>{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2 mt-8">
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
            >
              Predict Diabetes Risk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
