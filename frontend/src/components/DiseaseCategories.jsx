import React from "react";

const categories = [
  {
    title: "Diabetes",
    tags: ["Type 1", "Type 2", "Prediabetes"],
    illustrationBg: "bg-[#FFE7E7]",
    icon: "🩸",
  },
  {
    title: "Heart Disease",
    tags: ["Cardio", "Cholesterol", "BP"],
    illustrationBg: "bg-[#FFF2D9]",
    icon: "❤️",
  },
  {
    title: "Kidney Disease",
    tags: ["CKD", "Stones"],
    illustrationBg: "bg-[#FFF8CC]",
    icon: "🧪",
  },
  {
    title: "Lung Cancer",
    tags: ["Screening", "Symptoms"],
    illustrationBg: "bg-[#E8F3FF]",
    icon: "🫁",
  },
  {
    title: "Skin Cancer",
    tags: ["Melanoma", "Lesions"],
    illustrationBg: "bg-[#EEF0FF]",
    icon: "🧴",
  },
  {
    title: "COVID-19",
    tags: ["Symptoms", "Prevention", "Risk"],
    illustrationBg: "bg-[#FFEFE0]",
    icon: "🦠",
  },
];

export default function DiseaseCategories() {
  return (
    <div className="w-full py-14">
      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-bold text-black">
        Disease Categories
      </h2>

      <p className="text-center text-slate-600 mt-2">
        Find diseases and start diagnosis instantly using AI insights.
      </p>

      {/* Cards Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition cursor-pointer"
          >
            {/* LEFT SIDE TEXT */}
            <div>
              <h3 className="text-xl font-semibold">{cat.title}</h3>

              <div className="flex flex-wrap gap-2 mt-3">
                {cat.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 bg-gray-100 rounded-full text-sm shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-2 mt-6 text-slate-700 hover:text-blue-600 transition">
                Explore Category →
              </button>
            </div>

            {/* RIGHT SIDE ICON + CURVED BG */}
            <div
              className={`w-24 h-24 rounded-full ${cat.illustrationBg} flex items-center justify-center text-4xl`}
            >
              {cat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="text-blue-600 font-semibold hover:text-blue-800 underline text-lg">
          View All Categories
        </button>
      </div>
    </div>
  );
}
