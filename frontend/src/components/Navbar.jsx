import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/PredictiX_main_logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 py-4 shadow-md bg-gray-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="PredictiX" className="w-40" />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 text-lg font-medium">
        <NavLink to="/" className="hover:text-blue-600 transition">
          Home
        </NavLink>

        <NavLink to="/about" className="hover:text-blue-600 transition">
          About Us
        </NavLink>

        <NavLink to="/faqs" className="hover:text-blue-600 transition">
          FAQS
        </NavLink>

        <NavLink to="dashboard" className="hover:text-blue-600 transition">
          Predictors
        </NavLink>

        <NavLink
          to="/bmi-calculator"
          className="hover:text-blue-600 transition"
        >
          BMI Calculator
        </NavLink>

        

        <div className="flex items-center gap-4">
          <NavLink
            to="/sign-in"
            className="px-4 py-2 text-black hover:text-blue-600 transition"
          >
            Sign In
          </NavLink>

          <NavLink
            to="/sign-up"
            className="px-4 py-2 text-black hover:text-blue-600 transition"
          >
            Sign Up
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-200 p-5 md:hidden shadow-lg">
          <div className="flex flex-col gap-4 text-lg">
            <NavLink
              to="/"
              className="text-gray-800 font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/predictors"
              className="text-gray-800 font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Predictors
            </NavLink>

            <NavLink
              to="/about"
              className="text-gray-800 font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </NavLink>

            <NavLink
              to="/sign-in"
              className="w-full text-center py-2 border border-gray-400 text-black rounded-lg hover:bg-blue-500 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </NavLink>

            <NavLink
              to="/sign-up"
              className="w-full text-center py-2 border border-gray-400 text-black rounded-lg hover:bg-blue-500 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
