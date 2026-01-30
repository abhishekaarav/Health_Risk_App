import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import Metric1 from "../assets/metrics/metric7.png";
import Metric2 from "../assets/metrics/metric5.png";
import Metric3 from "../assets/metrics/metric6.png";

export default function Metrics() {
  const navigate = useNavigate();

  const metricSlides = [
    {
      image: Metric1,
      title: "TRACK YOUR HEALTH WITH AI PRECISION",
      desc1: "Monitor heart, sugar & vital health metrics",
      desc2: "Insights powered by real medical data",
      desc3: "Your health journey, simplified",
    },
    {
      image: Metric2,
      title: "SMART HEALTH MONITORING FOR EVERYONE",
      desc1: "Instant reports generated through ML models",
      desc2: "Understand your body better with analytics",
      desc3: "Track progress & stay healthier",
    },
    {
      image: Metric3,
      title: "ADVANCED METRICS ANALYSIS USING AI",
      desc1: "Accurate predictions using real clinical datasets",
      desc2: "Compare heart, glucose, and lifestyle changes",
      desc3: "Empower yourself with knowledge",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-linear-to-br from-gray-50 via-zinc-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* FULL SCREEN CARD */}
        <div className="h-screen flex flex-col bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="shrink-0 bg-linear-to-r from-zinc-700 to-zinc-900 p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight">
              Health Metrics Overview
            </h1>
            <p className="text-zinc-200 text-sm sm:text-base mt-1">
              Track your health insights & predictions powered by AI
            </p>
          </div>

          {/* BUTTONS */}
          <div className="shrink-0 p-4 sm:p-6 bg-linear-to-b from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
              <button
                onClick={() => navigate("/heart-predict")}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-red-500 to-pink-600 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg active:scale-95"
              >
                Heart Attack Risk Prediction
              </button>

              <button
                onClick={() => navigate("/diabetes-predict")}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-green-500 to-emerald-600 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg active:scale-95"
              >
                Diabetes Risk Prediction
              </button>
            </div>
          </div>

          {/* SLIDER */}
          <div className="flex-1 min-h-0 relative w-full overflow-hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              loop
              className="w-full h-full metrics-swiper"
            >
              {metricSlides.map((slide, i) => (
                <SwiperSlide key={i} className="w-full h-full shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/60" />

                    <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-10 md:px-20 space-y-3 sm:space-y-4">
                      <h2 className="text-white text-lg sm:text-3xl md:text-5xl font-black leading-snug">
                        {slide.title}
                      </h2>

                      <div className="space-y-1 sm:space-y-2 text-white text-sm sm:text-lg md:text-xl">
                        <p>• {slide.desc1}</p>
                        <p>• {slide.desc2}</p>
                        <p>• {slide.desc3}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* NICHE CONTENT (SAME) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-xl">Heart Health</h3>
            <p className="text-gray-600 mt-2">
              AI-powered heart attack risk assessment using clinical datasets.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-xl">Diabetes Detection</h3>
            <p className="text-gray-600 mt-2">
              Predict diabetes risk using glucose & BMI analytics.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-xl">History Tracking</h3>
            <p className="text-gray-600 mt-2">
              View previous predictions and health progress.
            </p>
          </div>
        </div>
      </div>

      {/* SAFETY */}
      <style jsx>{`
        html, body {
          overflow-x: hidden;
        }
        .metrics-swiper .swiper-wrapper {
          width: 100% !important;
        }
      `}</style>
    </div>
  );
}
