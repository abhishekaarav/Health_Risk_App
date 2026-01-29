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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-zinc-50 to-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* MAIN CARD */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 animate-fade-in">
          {/* HEADER SECTION */}
          <div className="bg-gradient-to-r from-zinc-700 to-zinc-900 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 animate-slide-down">
              Health Metrics Overview
            </h1>
            <p className="text-zinc-200 text-sm sm:text-base md:text-lg animate-slide-down" style={{ animationDelay: '0.1s' }}>
              Track your health insights & predictions powered by AI
            </p>
          </div>

          {/* BUTTONS SECTION */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden active:scale-95"
                onClick={() => navigate("/heart-predict")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base">Heart Attack Risk Prediction</span>
                </div>
              </button>

              <button
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden active:scale-95"
                onClick={() => navigate("/diabetes-predict")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base">Diabetes Risk Prediction</span>
                </div>
              </button>
            </div>
          </div>

          {/* SLIDER SECTION - FULL WIDTH */}
          <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              loop
              className="w-full h-full metrics-swiper"
            >
              {metricSlides.map((slide, i) => (
                <SwiperSlide key={i} className="w-full h-full">
                  <div
                    className="w-full h-full bg-cover bg-center relative group"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 group-hover:from-black/70 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 space-y-3 sm:space-y-4 md:space-y-6">
                      <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black drop-shadow-2xl leading-tight transform transition-transform duration-500 group-hover:scale-105">
                        {slide.title}
                      </h1>
                      
                      <div className="space-y-2 sm:space-y-3 transform transition-transform duration-500 group-hover:translate-x-2">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium drop-shadow-lg">
                            {slide.desc1}
                          </p>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium drop-shadow-lg">
                            {slide.desc2}
                          </p>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium drop-shadow-lg">
                            {slide.desc3}
                          </p>
                        </div>
                      </div>

                      {/* Decorative element */}
                      <div className="w-20 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-zinc-400 to-transparent rounded-full transform transition-all duration-500 group-hover:w-32 sm:group-hover:w-48 md:group-hover:w-56"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {/* Feature 1 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-zinc-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Heart Health</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI-powered heart attack risk assessment using advanced machine learning models trained on clinical datasets.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-zinc-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Diabetes Detection</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Predict diabetes risk with precision analytics based on glucose levels, BMI, and lifestyle factors.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-zinc-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">History Tracking</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Track all your predictions, view detailed insights, and monitor your health journey over time.
            </p>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="mt-8 bg-gradient-to-r from-zinc-700 to-zinc-900 rounded-2xl p-8 shadow-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">98%</div>
              <div className="text-zinc-300 text-xs sm:text-sm font-medium">Model Accuracy</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">50K+</div>
              <div className="text-zinc-300 text-xs sm:text-sm font-medium">Predictions Made</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">24/7</div>
              <div className="text-zinc-300 text-xs sm:text-sm font-medium">Always Available</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">100%</div>
              <div className="text-zinc-300 text-xs sm:text-sm font-medium">Data Privacy</div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS SECTION */}
        <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Enter Your Data</h3>
                <p className="text-gray-600 text-sm">
                  Input your health metrics including age, blood pressure, glucose levels, and more.
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-8 -right-8 text-zinc-300">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">AI Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Our machine learning models analyze your data using real clinical research patterns.
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-8 -right-8 text-zinc-300">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Get Results</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed predictions, risk levels, and personalized health suggestions instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Custom Swiper pagination styling */
        :global(.metrics-swiper .swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }

        :global(.metrics-swiper .swiper-pagination-bullet-active) {
          background: white;
          width: 30px;
          border-radius: 5px;
        }

        :global(.metrics-swiper .swiper-pagination) {
          bottom: 20px;
        }

        :global(.metrics-swiper .swiper-slide) {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
        }

        :global(.metrics-swiper .swiper-wrapper) {
          display: flex !important;
        }
      `}</style>
    </div>
  );
}