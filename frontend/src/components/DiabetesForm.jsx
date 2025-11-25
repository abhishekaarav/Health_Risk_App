export default function DiabetesForm({ form, setForm, onSubmit, loading }) {
  const fields = [
    "Pregnancies",
    "Glucose",
    "DiastolicBP",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age",
  ];

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((name, index) => (
        <div key={index}>
          <label className="text-gray-700 font-medium block mb-1">{name}</label>
          <input
            type="number"
            name={name}
            value={form[name]}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            required
            className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            placeholder={`Enter ${name}`}
          />
        </div>
      ))}

      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-xl shadow hover:opacity-90 transition"
        >
          {loading ? "Predicting..." : "Predict Diabetes Risk"}
        </button>
      </div>
    </form>
  );
}
