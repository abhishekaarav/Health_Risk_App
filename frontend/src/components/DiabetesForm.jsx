export default function DiabetesForm({ form, setForm, onSubmit, loading }) {
  const fields = [
    { name: "Pregnancies", unit: "(count)" },
    { name: "Glucose", unit: "(mg/dL)" },
    { name: "DiastolicBP", unit: "(mm Hg)" },
    { name: "SkinThickness", unit: "(mm)" },
    { name: "Insulin", unit: "(IU/mL)" },
    { name: "BMI", unit: "(kg/m²)" },
    { name: "DiabetesPedigreeFunction", unit: "(value)" },
    { name: "Age", unit: "(years)" },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {fields.map((field, index) => (
          <div key={index}>
            <label className="text-gray-800 font-semibold text-lg block mb-1">
              {field.name} <span className="text-red-600">*</span>
              <span className="text-gray-500 ml-1">{field.unit}</span>
            </label>

            <input
              type="number"
              name={field.name}
              value={form[field.name]}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              required
              className="w-full border border-gray-300 p-3 rounded-lg bg-white 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                transition duration-200 hover:border-indigo-400 hover:bg-indigo-50"
              placeholder={`Enter ${field.name} ${field.unit}`}
            />
          </div>
        ))}

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg bg-gradient-to-r from-green-500 to-green-700 
              text-white font-semibold rounded-xl shadow hover:opacity-90 transition"
          >
            {loading ? "Predicting..." : "Predict Diabetes Risk"}
          </button>
        </div>
      </form>
    </div>
  );
}
