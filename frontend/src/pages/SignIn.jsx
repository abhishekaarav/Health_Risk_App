import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import img from "../assets/LoginPageImg.png";
import {
  FaHeartbeat,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaGoogle,
} from "react-icons/fa";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signin", formData, {
        withCredentials: true,
      });

      const data = res.data;

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      login(data.user);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fdecec] flex items-center justify-center">
      <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 px-10 lg:px-20">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center max-w-md w-full mx-auto">
          {/* BRAND */}
          <div className="flex items-center gap-3 mb-10">
            <FaHeartbeat className="text-indigo-600 text-5xl animate-pulse" />
            <h2 className="text-5xl font-bold tracking-wide text-indigo-600">
              MedicareAI
            </h2>
          </div>

          <h1 className="text-4xl font-bold mb-2">Login now</h1>
          <p className="text-gray-600 mb-6">Hi, Welcome back 👋</p>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            className="
              w-full bg-white text-black py-3 rounded-lg flex border
              items-center justify-center gap-3 mb-6
              cursor-pointer
              transition-all duration-300
              hover:shadow-xl hover:-translate-y-1
              active:scale-95
            "
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">
              or Login with Email
            </span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="
                  w-full py-3 pl-12 pr-4 rounded-lg
                  bg-white border border-gray-300
                  outline-none
                  transition-all duration-300
                  hover:border-indigo-400
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                "
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="
                  w-full py-3 pl-12 pr-12 rounded-lg
                  bg-white border border-gray-300
                  outline-none
                  transition-all duration-300
                  hover:border-indigo-400
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                "
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-600
                  transition-transform duration-300
                  hover:scale-125
                "
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-indigo-600 cursor-pointer"
                />
                Remember Me
              </label>
              <span className="text-indigo-600 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                flex items-center justify-center gap-3
                transition-all duration-300
                hover:bg-indigo-700 hover:shadow-2xl hover:-translate-y-1
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <FaSignInAlt />
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to="/sign-up"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden lg:flex items-center justify-center">
          <img
            src={img}
            alt="login illustration"
            className="
              w-full max-w-3xl h-auto object-contain
              transition-transform duration-700
              hover:scale-105
            "
          />
        </div>
      </div>
    </div>
  );
}
