import React, { useState } from "react";

export default function BMICalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [needleDeg, setNeedleDeg] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculateBMI = () => {
    if (!height || !weight) return;
    const hMeters = height / 100;
    const bmiValue = weight / (hMeters * hMeters);
    setBMI(bmiValue.toFixed(1));

    let cat = "";
    if (bmiValue < 18.5) {
      cat = "Underweight";
    } else if (bmiValue < 25) {
      cat = "Normal Weight";
    } else if (bmiValue < 30) {
      cat = "Overweight";
    } else {
      cat = "Obese";
    }
    setCategory(cat);

    const min = 16,
      max = 40;
    let p = (bmiValue - min) / (max - min);
    setNeedleDeg(Math.min(Math.max(p, 0), 1) * 180);

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

  const getCategoryColor = () => {
    if (category === "Underweight") return "text-blue-600";
    if (category === "Normal Weight") return "text-green-600";
    if (category === "Overweight") return "text-orange-600";
    if (category === "Obese") return "text-red-600";
    return "text-gray-600";
  };

  const getCategoryBg = () => {
    if (category === "Underweight") return "bg-blue-50 border-blue-200";
    if (category === "Normal Weight") return "bg-green-50 border-green-200";
    if (category === "Overweight") return "bg-orange-50 border-orange-200";
    if (category === "Obese") return "bg-red-50 border-red-200";
    return "bg-gray-50 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-zinc-600 to-zinc-700 px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Patient Information
                </h2>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* AGE */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age (years)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter age"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* GENDER */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                        className="peer sr-only"
                      />
                      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-600 peer-checked:bg-zinc-50 peer-checked:border-zinc-500 peer-checked:text-zinc-700 transition-all duration-200 font-medium">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        </svg>
                        Male
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                        className="peer sr-only"
                      />
                      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-600 peer-checked:bg-pink-50 peer-checked:border-pink-500 peer-checked:text-pink-700 transition-all duration-200 font-medium">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                          <circle cx="12" cy="12" r="4" />
                        </svg>
                        Female
                      </div>
                    </label>
                  </div>
                </div>

                {/* HEIGHT */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Enter height"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* WEIGHT */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Enter weight"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={calculateBMI}
                    disabled={!height || !weight}
                    className="flex-1 bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-zinc-500/30 hover:shadow-zinc-500/40 disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Calculate BMI</span>
                  </button>
                  <button
                    onClick={resetAll}
                    className="px-5 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT RESULT */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-zinc-600 to-zinc-700 px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Analysis Report
                </h2>
              </div>

              <div className="p-6 sm:p-8">
                {!bmi ? (
                  <div className="flex flex-col items-center justify-center h-[500px] lg:h-[600px] text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-zinc-50 to-indigo-50 flex items-center justify-center mb-6 border-2 border-zinc-100">
                      <svg
                        className="w-12 h-12 text-zinc-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Data Available
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Enter your measurements to calculate BMI
                    </p>
                    <p className="text-sm text-gray-500">
                      Your detailed health report will appear here
                    </p>
                  </div>
                ) : (
                  <div
                    className={`transition-all duration-500 ${showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    {/* BMI VALUE CARD */}
                    <div
                      className={`text-center mb-8 p-8 rounded-2xl border-2 ${getCategoryBg()} transition-all duration-500`}
                    >
                      <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Your BMI Score
                      </div>
                      <div className="text-6xl sm:text-7xl font-bold mb-2">
                        <span className={getCategoryColor()}>{bmi}</span>
                      </div>
                      <div className="text-lg text-gray-600 mb-3">kg/m²</div>
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold ${getCategoryColor()}`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${getCategoryColor().replace("text", "bg")}`}
                        ></div>
                        {category}
                      </div>
                    </div>

                    {/* GAUGE - Clean Semicircular Design */}
                    <div className="mb-8">
                      <div className="relative w-full max-w-md mx-auto">
                        <svg
                          className="w-full"
                          viewBox="0 0 300 180"
                          style={{ overflow: "visible" }}
                        >
                          <defs>
                            {/* Gradient definitions */}
                            <linearGradient
                              id="purpleGrad"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                            <linearGradient
                              id="greenGrad"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                            <linearGradient
                              id="yellowGrad"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#f59e0b" />
                              <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                            <linearGradient
                              id="orangeGrad"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#ea580c" />
                            </linearGradient>
                            <linearGradient
                              id="redGrad"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                          </defs>

                          {/* Gauge arcs */}
                          <path
                            d="M 30 150 A 120 120 0 0 1 75 55"
                            fill="none"
                            stroke="url(#purpleGrad)"
                            strokeWidth="40"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 75 55 A 120 120 0 0 1 150 30"
                            fill="none"
                            stroke="url(#greenGrad)"
                            strokeWidth="40"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 150 30 A 120 120 0 0 1 225 55"
                            fill="none"
                            stroke="url(#yellowGrad)"
                            strokeWidth="40"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 225 55 A 120 120 0 0 1 270 150"
                            fill="none"
                            stroke="url(#orangeGrad)"
                            strokeWidth="40"
                            strokeLinecap="round"
                          />

                          {/* Center white circle */}
                          <circle cx="150" cy="150" r="65" fill="white" />

                          {/* Needle */}
                          <g
                            className="transition-transform duration-1000 ease-out"
                            style={{
                              transformOrigin: "150px 150px",
                              transform: `rotate(${needleDeg - 90}deg)`,
                            }}
                          >
                            <line
                              x1="150"
                              y1="150"
                              x2="150"
                              y2="60"
                              stroke="#1f2937"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </g>

                          {/* Center circle with BMI */}
                          <circle cx="150" cy="150" r="40" fill="#1f2937" />
                          <text
                            x="150"
                            y="162"
                            fill="white"
                            fontSize="20"
                            fontWeight="700"
                            textAnchor="middle"
                          >
                            BMI
                          </text>
                        </svg>

                        {/* Labels below the gauge */}
                        <div className="grid grid-cols-4 gap-2 mt-4 text-xs sm:text-sm">
                          <div className="text-center">
                            <div className="w-3 h-3 rounded-full bg-purple-600 mx-auto mb-1"></div>
                            <div className="font-semibold text-purple-700">
                              Under
                            </div>
                            <div className="text-purple-600">&lt;18.5</div>
                          </div>
                          <div className="text-center">
                            <div className="w-3 h-3 rounded-full bg-green-600 mx-auto mb-1"></div>
                            <div className="font-semibold text-green-700">
                              Normal
                            </div>
                            <div className="text-green-600">18.5-24.9</div>
                          </div>
                          <div className="text-center">
                            <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
                            <div className="font-semibold text-orange-700">
                              Over
                            </div>
                            <div className="text-orange-600">25-29.9</div>
                          </div>
                          <div className="text-center">
                            <div className="w-3 h-3 rounded-full bg-red-600 mx-auto mb-1"></div>
                            <div className="font-semibold text-red-700">
                              Obese
                            </div>
                            <div className="text-red-600">30+</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* HEALTH METRICS */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-sm font-semibold text-green-900">
                              Healthy BMI
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-green-700 mb-1">
                          18.5 – 25
                        </div>
                        <div className="text-xs text-green-600">kg/m²</div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                              </svg>
                            </div>
                            <span className="text-sm font-semibold text-blue-500">
                              Healthy Weight
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {(18.5 * Math.pow(height / 100, 2)).toFixed(1)} –{" "}
                          {(25 * Math.pow(height / 100, 2)).toFixed(1)}
                        </div>
                        <div className="text-xs text-blue-600">kg</div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-zinc-600 to-zinc-700 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-sm font-semibold text-zinc-900">
                              BMI Prime
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-zinc-700 mb-1">
                          {(bmi / 25).toFixed(2)}
                        </div>
                        <div className="text-xs text-zinc-600">
                          ratio to upper limit
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-5 border border-cyan-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-sm font-semibold text-cyan-900">
                              Ponderal Index
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-cyan-700 mb-1">
                          {(weight / Math.pow(height / 100, 3)).toFixed(1)}
                        </div>
                        <div className="text-xs text-cyan-600">kg/m³</div>
                      </div>
                    </div>

                    {/* DISCLAIMER */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-amber-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-sm text-amber-800">
                        <span className="font-semibold">
                          Medical Disclaimer:
                        </span>{" "}
                        This BMI calculator is for informational purposes only.
                        Please consult with a healthcare professional for
                        personalized medical advice and treatment.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
