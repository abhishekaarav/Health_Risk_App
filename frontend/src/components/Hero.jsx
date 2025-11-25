import React from "react";
import { Link } from "react-router-dom";
import homepageimage from "../assets/homepageimage.png";

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          An AI Multi-Disease Diagnostic Suite
        </h1>

        <p className="text-lg md:text-xl mb-6">
          Revolutionizing Healthcare: Comprehensive, Rapid AI Diagnostics Suite
          for Accurate Multi-Disease Detection and Prevention.
        </p>

        <Link to="/predictors">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition">
            Diagnose Now
          </button>
        </Link>
      </div>

      <img
        src={homepageimage}
        alt="AI Multi-Disease Diagnostic Suite"
        className="w-full max-w-md md:max-w-lg mt-10 md:mt-0"
      />
    </section>
  );
}

export default Hero;
