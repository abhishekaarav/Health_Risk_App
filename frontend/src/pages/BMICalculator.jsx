import React, { useState } from "react";

export default function BMICalculator() {
  const [tab, setTab] = useState("metric");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [needleDeg, setNeedleDeg] = useState(0);
  const [glowColor, setGlowColor] = useState("");

  const [showResult, setShowResult] = useState(false); // smoother animation

  const calculateBMI = () => {
    if (!height || !weight) return;

    const hMeters = height / 100;
    const bmiValue = weight / (hMeters * hMeters);
    setBMI(bmiValue.toFixed(1));

    let cat = "";
    let glow = "";
    if (bmiValue < 18.5) {
      cat = "Underweight";
      glow = "shadow-red-400";
    } else if (bmiValue < 25) {
      cat = "Normal";
      glow = "shadow-green-400";
    } else if (bmiValue < 30) {
      cat = "Overweight";
      glow = "shadow-yellow-400";
    } else {
      cat = "Obesity";
      glow = "shadow-red-600";
    }

    setCategory(cat);
    setGlowColor(glow);

    const min = 16,
      max = 40;
    let p = (bmiValue - min) / (max - min);
    setNeedleDeg(Math.min(Math.max(p, 0), 1) * 180);

    // Show animated result
    setTimeout(() => setShowResult(true), 200);
  };

  const resetAll = () => {
    setAge("");
    setGender("male");
    setHeight("");
    setWeight("");
    setBMI(null);
    setCategory("");
    setNeedleDeg(0);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center w-full py-10 px-4 bg-gray-50">
      {/* HEADER */}
      <h1 className="text-5xl font-extrabold text-black drop-shadow mt-4">
        BMI Calculator
      </h1>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl mt-10">
        {/* LEFT FORM */}
        <div className="w-full md:w-[40%] bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border">
          {/* AGE */}
          <label className="font-semibold flex items-center gap-2 text-gray-700">
            👤 Age
          </label>
          <input
            className="w-full p-3 border rounded-xl mb-4 shadow-sm"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          {/* GENDER */}
          <label className="font-semibold flex items-center gap-2 text-gray-700">
            ⚥ Gender
          </label>
          <div className="flex gap-6 mb-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />{" "}
              Male
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />{" "}
              Female
            </label>
          </div>

          {/* HEIGHT */}
          <label className="font-semibold flex items-center gap-2 text-gray-700">
            📏 Height (cm)
          </label>
          <input
            className="w-full p-3 border rounded-xl mb-4 shadow-sm"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          {/* WEIGHT */}
          <label className="font-semibold flex items-center gap-2 text-gray-700">
            ⚖ Weight (kg)
          </label>
          <input
            className="w-full p-3 border rounded-xl mb-4 shadow-sm"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <div className="flex gap-4 mt-5">
            <button
              onClick={calculateBMI}
              className="bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:bg-blue-800 transition-all"
            >
              Calculate ▶
            </button>
            <button
              onClick={resetAll}
              className="bg-gray-300 py-3 px-5 rounded-xl shadow hover:bg-gray-400"
            >
              Clear
            </button>
          </div>
        </div>

        {/* RIGHT RESULT */}
        <div
          className={`w-full md:w-[60%] bg-white p-8 rounded-2xl shadow-2xl border transition-all duration-700 ${
            showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-bold text-2xl mb-4 text-blue-900">Result</h2>

          {bmi && (
            <>
              <p className="text-xl font-bold mb-4">
                BMI = <span className="text-blue-700">{bmi} kg/m²</span>{" "}
                <span className="text-green-600">({category})</span>
              </p>

              {/* BIGGER GAUGE */}
              <div className="relative w-[450px] h-[220px] mx-auto mt-6">
                {/* Glow */}
                <div
                  className={`absolute inset-0 blur-2xl opacity-70 ${glowColor}`}
                ></div>

                {/* Arc */}
                <svg width="450" height="220">
                  <path
                    d="M40 220 A180 180 0 0 1 410 220"
                    fill="none"
                    stroke="#8B0000"
                    strokeWidth="28"
                  />
                  <path
                    d="M80 220 A140 140 0 0 1 370 220"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="28"
                  />
                  <path
                    d="M120 220 A100 100 0 0 1 330 220"
                    fill="none"
                    stroke="#00A651"
                    strokeWidth="28"
                  />
                </svg>

                {/* Needle */}
                <div
                  className="absolute bottom-[0px] left-1/2 w-[4px] h-[120px] bg-gray-900 origin-bottom transition-transform duration-[1500ms] ease-out"
                  style={{ transform: `rotate(${needleDeg}deg)` }}
                ></div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-7 bg-black rounded-full"></div>
              </div>

              {/* DETAILS */}
              <ul className="mt-8 text-gray-700 space-y-2 text-lg">
                <li>• Healthy BMI range: 18.5 – 25 kg/m²</li>
                <li>
                  • Healthy weight:{" "}
                  {`${(18.5 * (height / 100) ** 2).toFixed(1)} – ${(
                    25 *
                    (height / 100) ** 2
                  ).toFixed(1)} kg`}
                </li>
                <li>• BMI Prime: {(bmi / 25).toFixed(2)}</li>
                <li>
                  • Ponderal Index:{" "}
                  {(weight / Math.pow(height / 100, 3)).toFixed(1)}
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
