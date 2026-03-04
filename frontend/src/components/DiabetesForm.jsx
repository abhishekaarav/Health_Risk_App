export default function DiabetesForm({
  form,
  setForm,
  onSubmit,
  loading,
  fieldErrors,
  ranges,
  setFieldErrors,
}) {
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

  const validateField = (name, value) => {
    let error = "";

    if (value < 0) {
      error = "Value cannot be negative";
    } else if (
      value < ranges[name][0] ||
      value > ranges[name][1]
    ) {
      error = `Value must be between ${ranges[name][0]} and ${ranges[name][1]}`;
    }

    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (name, value) => {
    if (value < 0) return;

    setForm({
      ...form,
      [name]: value,
    });

    validateField(name, Number(value));
  };

  const getBorder = (name) =>
    fieldErrors?.[name]
      ? "border-red-500 focus:ring-red-500 bg-red-50"
      : "border-gray-300 focus:ring-indigo-500";

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

              {ranges[field.name] && (
                <span className="text-gray-500 text-sm ml-2">
                  ({ranges[field.name][0]} - {ranges[field.name][1]})
                </span>
              )}
            </label>

            {/* NUMBER INPUT */}
            <input
              type="number"
              value={form[field.name]}
              min={ranges[field.name][0]}
              max={ranges[field.name][1]}
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              className={`w-full border p-3 rounded-lg mb-2 transition ${getBorder(
                field.name
              )}`}
              placeholder={`Enter ${field.name}`}
              required
            />

            {/* SLIDER */}
            <input
              type="range"
              min={ranges[field.name][0]}
              max={ranges[field.name][1]}
              value={form[field.name] || ranges[field.name][0]}
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              className="w-full accent-black cursor-pointer h-2 rounded-lg"
            />

            {fieldErrors?.[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors[field.name]}
              </p>
            )}
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