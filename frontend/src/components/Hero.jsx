import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/homepageImg/homeimg7.jpg";
import img2 from "../assets/homepageImg/homeimg6.jpg";
import img3 from "../assets/homepageImg/homeimg1.png";
import img4 from "../assets/homepageImg/homeimg10.jpg";
import img5 from "../assets/homepageImg/homeimg3.png";

import doctorImg from "../assets/homepageImg/doctor.png";
import patientImg from "../assets/homepageImg/patient.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import DiseaseCategories from "./DiseaseCategories";
import HospitalLocator from "./HospitalLocator"
import Footer from "./Footer";

function Hero() {
  const diseaseRef = useRef(null);
  const sliderImages = [img1, img2, img3, img4, img5];

  return (
    <>
      {/* ================= TOP IMAGE SLIDER ================= */}
      <div className="w-screen overflow-hidden">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-screen h-[220px] sm:h-[330px] md:h-[420px]"
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index} className="w-screen h-full">
              <img
                src={img}
                alt="Slider Banner"
                className="w-screen h-full object-fill"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* =============== HERO SECTION (PERFECT LEFT–RIGHT JUSTIFY BETWEEN) ================= */}
      <section className="w-full bg-[#f5f5f7] py-14">
        <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* LEFT SIDE TEXT */}
            <div className="w-full md:w-1/2 md:pl-2">
              <p className="text-sm md:text-base font-semibold tracking-wide text-blue-600 mb-2 uppercase">
                Bharat&apos;s Trusted & Affordable
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-black">
                AI-Powered{" "}
                <span className="text-orange-500">Multi-Disease</span>{" "}
                <span className="text-blue-600">Diagnostic</span> Platform
              </h1>

              <p className="text-base md:text-lg text-slate-700 mb-6">
                Early detection for Diabetes, Heart Disease, Kidney issues, Lung
                cancer, Skin cancer & more – all in one smart AI suite designed
                for fast & accurate screening.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link to="/metrics">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
                    Diagnose Now
                  </button>
                </Link>

                <button
                  onClick={() =>
                    diseaseRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  className="text-blue-700 font-medium hover:text-orange-500 transition"
                >
                  View Supported Diseases
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-600">
                <span className="px-4 py-2 rounded-full bg-white shadow-sm">
                  ⚡ Fast AI reports
                </span>
                <span className="px-4 py-2 rounded-full bg-white shadow-sm">
                  🔒 Secure health data
                </span>
                <span className="px-4 py-2 rounded-full bg-white shadow-sm">
                  ⚕️ Doctor-friendly insights
                </span>
              </div>
            </div>

            {/* RIGHT SIDE DOCTOR + PATIENT */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-[360px] h-[360px] md:w-[440px] md:h-[440px] bg-[#e0e0e0] rounded-full shadow-inner flex items-center justify-center">
                {/* Doctor Big Circle */}
                <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-gray-300 via-gray-100 to-white shadow-xl flex items-center justify-center">
                  <img
                    src={doctorImg}
                    alt="Doctor"
                    className="w-52 h-52 md:w-60 md:h-60 rounded-full object-cover shadow-xl border-4 border-white"
                  />
                </div>

                {/* Patient small circle */}
                <div className="absolute -right-6 top-24 w-28 h-28 md:w-32 md:h-32 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center">
                  <img
                    src={patientImg}
                    alt="Patient"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                  />
                </div>

                {/* Doctor bubble */}
                <div className="absolute -left-10 bottom-10 max-w-[230px]">
                  <div className="bg-blue-600 text-white text-sm rounded-2xl px-5 py-3 shadow-xl">
                    Our AI will screen multiple diseases in seconds & provide a
                    doctor-friendly report.
                  </div>
                </div>

                {/* Patient bubble */}
                <div className="absolute right-0 -top-6 max-w-[230px]">
                  <div className="bg-white text-black text-sm rounded-2xl px-5 py-3 shadow-xl border border-gray-300">
                    Doctor, can this app quickly check my health risks?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div ref={diseaseRef}>
        <DiseaseCategories />
      </div>
      <HospitalLocator />
      <Footer />
    </>
  );
}

export default Hero;
