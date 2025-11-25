import React from "react";
import MetricsSlider from "../components/MetricsSlider";

export default function Metrics() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* PAGE HEADER */}
      <div className="w-full bg-white shadow p-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Health Metrics Overview
        </h1>
        <p className="text-gray-500">
          Track your health insights & predictions powered by AI
        </p>
      </div>

      {/* METRICS SLIDER */}
      <div className="px-4">
        <MetricsSlider />
      </div>
    </div>
  );
}
