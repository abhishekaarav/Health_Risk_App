import React, { useState } from "react";

const categories = [
  {
    title: "Diabetes",
    tags: ["Type 1", "Type 2", "Prediabetes"],
    illustrationBg: "bg-[#FFE7E7]",
    icon: "🩸",
    description: "Diabetes is a chronic condition that affects how your body processes blood sugar (glucose). It occurs when the pancreas doesn't produce enough insulin or when the body can't effectively use the insulin it produces.",
    symptoms: ["Increased thirst and urination", "Extreme hunger", "Unexplained weight loss", "Fatigue", "Blurred vision", "Slow-healing sores"],
    riskFactors: ["Family history", "Overweight", "Physical inactivity", "Age over 45", "High blood pressure"],
    prevention: ["Maintain healthy weight", "Exercise regularly", "Eat balanced diet", "Regular health checkups"]
  },
  {
    title: "Heart Disease",
    tags: ["Cardio", "Cholesterol", "BP"],
    illustrationBg: "bg-[#FFF2D9]",
    icon: "❤️",
    description: "Heart disease encompasses various conditions affecting the heart, including coronary artery disease, heart rhythm problems, and heart defects. It's one of the leading causes of death worldwide.",
    symptoms: ["Chest pain or discomfort", "Shortness of breath", "Pain in neck, jaw, or back", "Fatigue", "Irregular heartbeat", "Swelling in legs"],
    riskFactors: ["High blood pressure", "High cholesterol", "Smoking", "Obesity", "Diabetes", "Sedentary lifestyle"],
    prevention: ["Quit smoking", "Control blood pressure", "Reduce cholesterol", "Exercise regularly", "Healthy diet", "Manage stress"]
  },
  {
    title: "Kidney Disease",
    tags: ["CKD", "Stones"],
    illustrationBg: "bg-[#FFF8CC]",
    icon: "🧪",
    description: "Kidney disease occurs when kidneys become damaged and can't filter blood properly. This can cause waste to build up in the body and lead to other health problems.",
    symptoms: ["Fatigue and weakness", "Swelling in feet and ankles", "Decreased urine output", "Nausea and vomiting", "Sleep problems", "Changes in urination"],
    riskFactors: ["Diabetes", "High blood pressure", "Family history", "Age over 60", "Obesity", "Smoking"],
    prevention: ["Control blood sugar", "Manage blood pressure", "Stay hydrated", "Avoid smoking", "Maintain healthy weight", "Regular checkups"]
  },
  {
    title: "Lung Cancer",
    tags: ["Screening", "Symptoms"],
    illustrationBg: "bg-[#E8F3FF]",
    icon: "🫁",
    description: "Lung cancer is a type of cancer that begins in the lungs. It's the leading cause of cancer deaths worldwide. Most lung cancer cases are linked to smoking.",
    symptoms: ["Persistent cough", "Coughing up blood", "Chest pain", "Shortness of breath", "Unexplained weight loss", "Hoarseness"],
    riskFactors: ["Smoking", "Secondhand smoke", "Radon exposure", "Asbestos exposure", "Family history", "Air pollution"],
    prevention: ["Don't smoke or quit smoking", "Avoid secondhand smoke", "Test home for radon", "Avoid carcinogens", "Eat healthy diet", "Exercise regularly"]
  },
  {
    title: "Skin Cancer",
    tags: ["Melanoma", "Lesions"],
    illustrationBg: "bg-[#EEF0FF]",
    icon: "🧴",
    description: "Skin cancer is the abnormal growth of skin cells, most often developing on skin exposed to the sun. The three main types are basal cell carcinoma, squamous cell carcinoma, and melanoma.",
    symptoms: ["New moles or growths", "Changes in existing moles", "Sores that don't heal", "Rough, scaly patches", "Dark lesions", "Bleeding or itching spots"],
    riskFactors: ["Excessive sun exposure", "Fair skin", "History of sunburns", "Tanning beds", "Family history", "Weakened immune system"],
    prevention: ["Use sunscreen daily", "Avoid peak sun hours", "Wear protective clothing", "Avoid tanning beds", "Regular skin checks", "Stay in shade"]
  },
  {
    title: "COVID-19",
    tags: ["Symptoms", "Prevention", "Risk"],
    illustrationBg: "bg-[#FFEFE0]",
    icon: "🦠",
    description: "COVID-19 is an infectious disease caused by the SARS-CoV-2 virus. It primarily affects the respiratory system and can range from mild to severe illness.",
    symptoms: ["Fever or chills", "Cough", "Difficulty breathing", "Fatigue", "Loss of taste or smell", "Sore throat", "Body aches"],
    riskFactors: ["Older age", "Chronic diseases", "Weakened immune system", "Obesity", "Smoking", "Unvaccinated"],
    prevention: ["Get vaccinated", "Wear masks in crowded areas", "Practice social distancing", "Wash hands frequently", "Avoid touching face", "Stay home when sick"]
  },
];

export default function DiseaseCategories() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full py-14 bg-white">
      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-bold text-black">
        Disease Categories
      </h2>

      <p className="text-center text-slate-600 mt-2">
        Find diseases and start diagnosis instantly using AI insights.
      </p>

      {/* Cards Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 max-w-7xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl shadow-md overflow-visible hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
            style={{ minHeight: '200px' }}
          >
            {/* Card Header */}
            <div className="p-6 flex justify-between items-center">
              {/* LEFT SIDE TEXT */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{cat.title}</h3>

                <div className="flex flex-wrap gap-2 mt-3">
                  {cat.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleExpand(index)}
                  className="flex items-center gap-2 mt-6 text-blue-600 hover:text-orange-500 font-medium transition-colors"
                >
                  {expandedIndex === index ? (
                    <>
                      Hide Details
                      <svg className="w-4 h-4 transition-transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Explore Category →
                    </>
                  )}
                </button>
              </div>

              {/* RIGHT SIDE ICON + CURVED BG */}
              <div
                className={`w-20 h-20 rounded-full ${cat.illustrationBg} flex items-center justify-center text-3xl flex-shrink-0 ml-4`}
              >
                {cat.icon}
              </div>
            </div>

            {/* Expandable Details */}
            <div
              className={`absolute left-full top-0 ml-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 transition-all duration-500 ease-in-out ${
                expandedIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              }`}
            >
              <div className="p-6 space-y-5 max-h-[600px] overflow-y-auto">
                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-blue-600">📋</span>
                    Overview
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Symptoms */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    Common Symptoms
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {cat.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Factors */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-orange-500">⚡</span>
                    Risk Factors
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {cat.riskFactors.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    Prevention Tips
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {cat.prevention.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="text-blue-600 font-semibold hover:text-orange-500 underline text-lg transition-colors">
          View All Categories
        </button>
      </div>
    </div>
  );
}