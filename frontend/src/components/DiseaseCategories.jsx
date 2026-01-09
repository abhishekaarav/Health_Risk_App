import React, { useState } from "react";

const categories = [
  {
    title: "Diabetes",
    tags: ["Type 1", "Type 2", "Prediabetes"],
    illustrationBg: "bg-[#FFE7E7]",
    icon: "🩸",
    description:
      "Diabetes is a chronic condition that affects how your body processes blood sugar (glucose). It occurs when the pancreas doesn't produce enough insulin or when the body can't effectively use the insulin it produces.",
    symptoms: [
      "Increased thirst and urination",
      "Extreme hunger",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision",
      "Slow-healing sores",
    ],
    riskFactors: [
      "Family history",
      "Overweight",
      "Physical inactivity",
      "Age over 45",
      "High blood pressure",
    ],
    prevention: [
      "Maintain healthy weight",
      "Exercise regularly",
      "Eat balanced diet",
      "Regular health checkups",
    ],
  },
  {
    title: "Heart Disease",
    tags: ["Cardio", "Cholesterol", "BP"],
    illustrationBg: "bg-[#FFF2D9]",
    icon: "❤️",
    description:
      "Heart disease encompasses various conditions affecting the heart, including coronary artery disease, heart rhythm problems, and heart defects.",
    symptoms: [
      "Chest pain or discomfort",
      "Shortness of breath",
      "Pain in neck, jaw, or back",
      "Fatigue",
      "Irregular heartbeat",
      "Swelling in legs",
    ],
    riskFactors: [
      "High blood pressure",
      "High cholesterol",
      "Smoking",
      "Obesity",
      "Diabetes",
    ],
    prevention: [
      "Quit smoking",
      "Control blood pressure",
      "Reduce cholesterol",
      "Exercise regularly",
      "Healthy diet",
    ],
  },
  {
    title: "Kidney Disease",
    tags: ["CKD", "Stones"],
    illustrationBg: "bg-[#FFF8CC]",
    icon: "🧪",
    description:
      "Kidney disease occurs when kidneys become damaged and can't filter blood properly, causing waste buildup in the body.",
    symptoms: [
      "Fatigue and weakness",
      "Swelling in feet and ankles",
      "Decreased urine output",
      "Nausea and vomiting",
      "Sleep problems",
    ],
    riskFactors: [
      "Diabetes",
      "High blood pressure",
      "Family history",
      "Age over 60",
      "Obesity",
    ],
    prevention: [
      "Control blood sugar",
      "Manage blood pressure",
      "Stay hydrated",
      "Avoid smoking",
      "Regular checkups",
    ],
  },
  {
    title: "Lung Cancer",
    tags: ["Screening", "Symptoms"],
    illustrationBg: "bg-[#E8F3FF]",
    icon: "🫁",
    description:
      "Lung cancer begins in the lungs and is most commonly caused by smoking or exposure to harmful substances.",
    symptoms: [
      "Persistent cough",
      "Coughing up blood",
      "Chest pain",
      "Shortness of breath",
      "Unexplained weight loss",
    ],
    riskFactors: [
      "Smoking",
      "Secondhand smoke",
      "Radon exposure",
      "Air pollution",
      "Family history",
    ],
    prevention: [
      "Quit smoking",
      "Avoid secondhand smoke",
      "Healthy lifestyle",
      "Regular screening",
    ],
  },
  {
    title: "Skin Cancer",
    tags: ["Melanoma", "Lesions"],
    illustrationBg: "bg-[#EEF0FF]",
    icon: "🧴",
    description:
      "Skin cancer is the abnormal growth of skin cells, usually due to excessive sun exposure.",
    symptoms: [
      "New or changing moles",
      "Non-healing sores",
      "Dark or irregular lesions",
    ],
    riskFactors: [
      "Sun exposure",
      "Fair skin",
      "Tanning beds",
      "Family history",
    ],
    prevention: [
      "Use sunscreen",
      "Wear protective clothing",
      "Avoid tanning beds",
      "Regular skin checks",
    ],
  },
  {
    title: "COVID-19",
    tags: ["Symptoms", "Prevention"],
    illustrationBg: "bg-[#FFEFE0]",
    icon: "🦠",
    description:
      "COVID-19 is an infectious disease affecting the respiratory system, caused by SARS-CoV-2.",
    symptoms: [
      "Fever",
      "Cough",
      "Breathing difficulty",
      "Fatigue",
      "Loss of taste or smell",
    ],
    riskFactors: [
      "Older age",
      "Chronic diseases",
      "Weak immunity",
      "Unvaccinated",
    ],
    prevention: [
      "Get vaccinated",
      "Wear masks",
      "Wash hands",
      "Avoid crowds",
    ],
  },
];

export default function DiseaseCategories() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full py-14 bg-white">
      <h2 className="text-center text-4xl font-bold">Disease Categories</h2>
      <p className="text-center text-gray-600 mt-2">
        Find diseases and start diagnosis instantly using AI insights.
      </p>

      {/* GRID */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 max-w-7xl mx-auto items-stretch">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl shadow-md border border-gray-100 flex flex-col h-full"
          >
            {/* HEADER */}
            <div className="p-6 flex justify-between items-start min-h-[220px]">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{cat.title}</h3>

                <div className="flex flex-wrap gap-2 mt-3">
                  {cat.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white rounded-full text-sm shadow"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-6 text-blue-600 font-medium hover:text-orange-500"
                >
                  {expandedIndex === index ? "Hide Details ▲" : "Explore Category →"}
                </button>
              </div>

              <div
                className={`w-20 h-20 rounded-full ${cat.illustrationBg} flex items-center justify-center text-3xl`}
              >
                {cat.icon}
              </div>
            </div>

            {/* EXPANDABLE */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                expandedIndex === index ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <div className="px-6 pb-6 border-t pt-6 space-y-5 bg-white flex-1">
                <p className="text-sm text-gray-600">{cat.description}</p>

                <div>
                  <h4 className="font-semibold">Symptoms</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    {cat.symptoms.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Risk Factors</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    {cat.riskFactors.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Prevention</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    {cat.prevention.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
