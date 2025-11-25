import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

// Replace with your own metric images
import Metric1 from "../assets/metrics/metric1.png";
import Metric2 from "../assets/metrics/metric2.png";
import Metric3 from "../assets/metrics/metric3.png";


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
    <section className="w-full">
      {/* PAGE BUTTONS */}
      <div className="flex justify-center gap-4 mb-6 mt-4">
        <button
          className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
          onClick={() => navigate("/heart-predict")}
        >
          Heart Attack Risk Prediction
        </button>

        <button
          className="px-5 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
          onClick={() => navigate("/diabetes-predict")}
        >
          Diabetes Risk Prediction
        </button>
      </div>

      {/* SWIPER SLIDER */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
      >
        {metricSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full h-full relative bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* TEXT OVERLAY */}
              <div className="absolute inset-0 bg-black/20 flex flex-col px-10 justify-center">
                <div className="w-200 h-35 bg-white/40 text-center rounded-xl">
                  <h1 className="text-xl sm:text-2xl md:text-5xl font-bold drop-shadow-lg text-black mt-4">
                    {slide.title}
                  </h1>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold sm:text-2xl md:text-4xl drop-shadow-lg text-black py-4">
                    {slide.desc1}
                  </h3>
                  <h3 className="text-xl font-semibold sm:text-2xl md:text-4xl drop-shadow-lg text-black py-4">
                    {slide.desc2}
                  </h3>
                  <h3 className="text-xl font-semibold sm:text-2xl md:text-4xl drop-shadow-lg text-black py-4">
                    {slide.desc3}
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
