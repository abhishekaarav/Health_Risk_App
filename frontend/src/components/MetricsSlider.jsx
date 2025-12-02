import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

import Metric1 from "../assets/metrics/metric7.png";
import Metric2 from "../assets/metrics/metric5.png";
import Metric3 from "../assets/metrics/metric6.png";

export default function MetricsSlider() {
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
      desc1: "Get accurate predictions using real clinical datasets",
      desc2: "Compare heart, glucose, and lifestyle changes",
      desc3: "Empower yourself with knowledge",
    },
  ];

  return (
    <section className="w-full space-y-6">
      {/* PAGE WIDTH WRAPPER */}
      <div className="max-w-7xl mx-auto px-4">
        {/* PAGE BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
            onClick={() => navigate("/dashboard/heart-predict")}
          >
            Heart Attack Risk Prediction
          </button>

          <button
            className="px-5 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
            onClick={() => navigate("/dashboard/diabetes-predict")}
          >
            Diabetes Risk Prediction
          </button>
        </div>

        {/* SWIPER SLIDER */}
        <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg mt-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-full"
          >
            {metricSlides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div
                  className="w-full h-full relative bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-6 md:px-12">
                    <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-white mt-4 text-lg sm:text-xl md:text-2xl">
                      {slide.desc1}
                    </p>
                    <p className="text-white text-lg sm:text-xl md:text-2xl">
                      {slide.desc2}
                    </p>
                    <p className="text-white text-lg sm:text-xl md:text-2xl">
                      {slide.desc3}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
