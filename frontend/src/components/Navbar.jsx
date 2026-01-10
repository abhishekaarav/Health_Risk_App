import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/PredictiX_main_logo.png";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const navItem = "transition hover:text-blue-600 hover:font-semibold";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gray-50 shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <img src={logo} alt="PredictiX" className="w-40" />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 font-medium">
        <NavLink to="/" className={navItem}>
          Home
        </NavLink>
        <NavLink to="/about" className={navItem}>
          About Us
        </NavLink>
        <NavLink to="/faqs" className={navItem}>
          FAQs
        </NavLink>
        <NavLink to="/dashboard" className={navItem}>
          Predictors
        </NavLink>
        <NavLink to="/bmi-calculator" className={navItem}>
          BMI Calculator
        </NavLink>

        {/* AUTH */}
        {!isLoggedIn ? (
          <div className="flex items-center">
            <NavLink to="/sign-in" className={navItem}>
              Sign In
            </NavLink>
            <span className="mx-1">/</span>
            <NavLink to="/sign-up" className={navItem}>
              Sign Up
            </NavLink>
          </div>
        ) : (
          <img
            src={
              user?.profilePhoto
                ? `http://localhost:5000${user.profilePhoto}`
                : "/user.png"
            }
            alt="Profile"
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-full object-cover cursor-pointer border hover:scale-105 transition"
          />
        )}
      </div>

      {/* Mobile Icon */}
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-200 p-5 md:hidden shadow-lg">
          <div className="flex flex-col gap-4 font-medium">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={navItem}
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={navItem}
            >
              Predictors
            </NavLink>
            <NavLink
              to="/bmi-calculator"
              onClick={() => setIsOpen(false)}
              className={navItem}
            >
              BMI Calculator
            </NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className={navItem}
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className={navItem}
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={navItem}
              >
                Profile
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
