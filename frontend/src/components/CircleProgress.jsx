import React from "react";

export default function CircleProgress({ percent }) {
  const ringColor =
    percent >= 70
      ? "stroke-red-500"
      : percent >= 40
      ? "stroke-yellow-500"
      : "stroke-green-500";

  const glow =
    percent >= 70
      ? "shadow-red-400"
      : percent >= 40
      ? "shadow-yellow-400"
      : "shadow-green-400";

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div
        className={`absolute w-44 h-44 rounded-full blur-xl opacity-70 ${glow}`}
      ></div>

      <svg className="w-40 h-40 transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r="65"
          strokeWidth="12"
          fill="none"
          className={`${ringColor} transition-all duration-700`}
          strokeDasharray={2 * Math.PI * 65}
          strokeDashoffset={(2 * Math.PI * 65 * (100 - percent)) / 100}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <div className="text-5xl">
          {percent >= 70 ? "⚠️" : percent >= 40 ? "🟡" : "🟢"}
        </div>

        <span className="text-2xl font-bold mt-1">{percent}%</span>
      </div>
    </div>
  );
}
