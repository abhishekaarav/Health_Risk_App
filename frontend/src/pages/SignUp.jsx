import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHeartbeat,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import img from "../assets/LoginPageImg.png";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Email validation
    if (id === "email") {
      if (!emailPattern.test(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }

    // Password validation
    if (id === "password") {
      if (!passwordPattern.test(value)) {
        setPasswordError(
          "Min 8 chars, 1 uppercase, 1 lowercase & 1 number"
        );
      } else {
        setPasswordError("");
      }
    }
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // ✅ FINAL CLIENT CHECK
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!passwordPattern.test(formData.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number"
      );
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", formData);
      const data = res.data;

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fdecec] pl-40">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 pl-20">
        <div className="flex flex-col w-full pt-16 pl-24">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <FaHeartbeat className="text-indigo-600 text-5xl animate-pulse" />
              <h2 className="text-5xl font-bold text-indigo-600">MedicareAI</h2>
            </div>

            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>

            <p className="text-gray-600 mb-8">
              To keep connected with us please login with your personal info
            </p>

            <Link
              to="/sign-in"
              className="
                inline-flex items-center gap-3
                border-2 border-indigo-600 text-indigo-600
                px-12 py-3 rounded-full font-semibold
                cursor-pointer
                transition-all duration-300
                hover:bg-indigo-600 hover:text-white hover:shadow-lg
                active:scale-95
              "
            >
              <FaSignInAlt />
              LOGIN
            </Link>
          </div>

          <div className="mt-3 -ml-16">
            <img
              src={img}
              alt="medical illustration"
              className="
                w-full max-w-3xl h-auto object-contain
                transition-transform duration-700
                hover:scale-105
              "
            />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div
          className="
            w-full max-w-lg
            bg-white/70 backdrop-blur-xl
            rounded-2xl shadow-2xl
            px-10 py-10
          "
        >
          <h2 className="text-4xl font-bold text-center mb-6">
            Create Account
          </h2>

          {/* GOOGLE */}
          <button
            type="button"
            className="
              w-full bg-white border py-3 rounded-lg
              flex items-center justify-center gap-3 mb-6
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-1
            "
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="flex items-center mb-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">
              or use your email for registration
            </span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="username"
                type="text"
                placeholder="Name"
                value={formData.username}
                onChange={handleChange}
                className="
                  w-full py-3 pl-12 pr-4 rounded-lg border
                  transition-all duration-300
                  hover:border-indigo-400
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                  outline-none
                "
                required
              />
            </div>

            {/* EMAIL */}
            <div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="
                  w-full py-3 pl-12 pr-4 rounded-lg border
                  transition-all duration-300
                  hover:border-indigo-400
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                  outline-none
                "
                required
              />
            </div>
            {emailError && (
                <p className="text-red-600 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full py-3 pl-12 pr-12 rounded-lg border
                  transition-all duration-300
                  hover:border-indigo-400
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                  outline-none
                "
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-500 transition-transform duration-300
                  hover:scale-110
                "
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {/* REGISTER */}
            <button
              disabled={loading}
              className="
                w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                flex items-center justify-center gap-3
                transition-all duration-300
                hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1
                active:scale-95
                disabled:opacity-50
              "
            >
              <FaUserPlus />
              {loading ? "Creating Account..." : "REGISTER"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
