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

    if (id === "email") {
      setEmailError(emailPattern.test(value) ? "" : "Invalid email format");
    }

    if (id === "password") {
      setPasswordError(
        passwordPattern.test(value)
          ? ""
          : "Min 8 chars, 1 uppercase, 1 lowercase & 1 number"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailPattern.test(formData.email)) return setError("Invalid Email");
    if (!passwordPattern.test(formData.password))
      return setError("Weak Password");

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", formData);
      if (res.data.success === false) return setError(res.data.message);

      navigate("/sign-in");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fdecec] px-4 lg:px-0">
      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 justify-center">
        <div className="flex flex-col pt-16 px-10 xl:px-24">
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
              className="inline-flex items-center gap-3 border-2 border-indigo-600 text-indigo-600 px-12 py-3 rounded-full font-semibold transition hover:bg-indigo-600 hover:text-white"
            >
              <FaSignInAlt /> LOGIN
            </Link>
          </div>

          <img
            src={img}
            alt=""
            className="mt-10 w-full max-w-3xl hover:scale-105 transition"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl px-8 sm:px-10 py-10">
          <h2 className="text-4xl font-bold text-center mb-6">
            Create Account
          </h2>

          <button className="w-full border py-3 rounded-lg flex justify-center gap-3 mb-6 hover:shadow">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              icon={<FaUser />}
              id="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              icon={<FaEnvelope />}
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 pl-12 pr-12 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center gap-2"
            >
              <FaUserPlus />
              {loading ? "Creating..." : "REGISTER"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const Input = ({icon,id,placeholder,value,onChange}) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full py-3 pl-12 pr-4 border rounded-lg"
    />
  </div>
);
