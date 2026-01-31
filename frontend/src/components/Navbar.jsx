import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaLock, FaPen, FaUser } from "react-icons/fa";
import logo from "../assets/MedicareAiLogo2.png";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const navItem =
    "relative transition text-gray-800 hover:text-indigo-600 font-medium";

  const activeNav =
    "text-indigo-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-indigo-600 after:to-purple-600";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-indigo-200 via-purple-80 to-pink-200 backdrop-blur-sm shadow-lg border-b border-white/20">
      <div className="pl-16 pr-4 sm:px-8 lg:px-14 flex items-center justify-between relative h-22">
        <div className="shrink-0 relative z-10 scale-100">
          <img
            src={logo}
            alt="MedicareAI"
            className="h-24 sm:h-28 md:h-32 lg:h-36 cursor-pointer drop-shadow-md hover:drop-shadow-xl transition-all duration-300"
            onClick={() => navigate("/")}
          />
        </div>
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex flex-1 justify-center gap-6 xl:gap-10 mx-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItem} text-lg xl:text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navItem} text-lg xl:text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/faqs"
            className={({ isActive }) =>
              `${navItem} text-lg xl:text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            FAQs
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navItem} text-lg xl:text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            Predictors
          </NavLink>
          <NavLink
            to="/bmi-calculator"
            className={({ isActive }) =>
              `${navItem} text-lg xl:text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            BMI Calculator
          </NavLink>
        </div>

        {/* Desktop Auth Buttons/Profile */}
        <div className="hidden lg:flex items-center">
          {!isLoggedIn ? (
            <div className="flex items-center gap-3 xl:gap-8">
              <NavLink
                to="/sign-in"
                className="relative flex items-center gap-2 px-3 xl:px-4 py-2 text-base xl:text-[22px] font-semibold border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all duration-300 rounded-md pr-4 xl:pr-6 shadow-sm hover:shadow-md"
              >
                <span className="absolute -left-3 xl:-left-4 w-6 h-6 xl:w-8 xl:h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">
                  <FaLock size={14} className="xl:w-4 xl:h-4" />
                </span>
                <span className="ml-3 xl:ml-4">Login</span>
              </NavLink>

              <NavLink
                to="/sign-up"
                className="relative flex items-center gap-2 px-3 xl:px-4 py-2 text-base xl:text-[22px] font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md pr-4 xl:pr-6 shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                <span className="absolute -left-3 xl:-left-4 w-6 h-6 xl:w-8 xl:h-8 flex items-center justify-center rounded-full bg-white text-indigo-600 border-2 border-white shadow-md">
                  <FaPen size={14} className="xl:w-4 xl:h-4" />
                </span>
                <span className="ml-3 xl:ml-4">Register</span>
              </NavLink>
            </div>
          ) : user?.profilePhoto && !user.profilePhoto.includes("default") ? (
            <img
              src={`http://localhost:5000${user.profilePhoto}`}
              alt="Profile"
              onClick={() => navigate("/profile")}
              className="w-12 h-12 xl:w-15 xl:h-15 rounded-full cursor-pointer border-2 border-indigo-400 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl ring-2 ring-purple-300 ring-offset-2"
            />
          ) : (
            <div
              onClick={() => navigate("/profile")}
              className="w-12 h-12 xl:w-15 xl:h-15 rounded-full cursor-pointer border-2 border-indigo-400 flex items-center justify-center font-bold text-indigo-700 bg-gradient-to-br from-indigo-100 to-purple-100 hover:scale-105 transition-all duration-300 text-xl shadow-md hover:shadow-xl ring-2 ring-purple-300 ring-offset-2"
            >
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden z-50 text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-br from-white via-indigo-50 to-purple-50 px-6 py-5 shadow-2xl backdrop-blur-md border-t border-indigo-100">
          <div className="flex flex-col gap-4 font-medium">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-indigo-700 font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 shadow-sm"
                    : "text-gray-700 hover:bg-indigo-50"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-indigo-700 font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 shadow-sm"
                    : "text-gray-700 hover:bg-indigo-50"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/faqs"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-indigo-700 font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 shadow-sm"
                    : "text-gray-700 hover:bg-indigo-50"
                }`
              }
            >
              FAQs
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-indigo-700 font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 shadow-sm"
                    : "text-gray-700 hover:bg-indigo-50"
                }`
              }
            >
              Predictors
            </NavLink>
            <NavLink
              to="/bmi-calculator"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-indigo-700 font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 shadow-sm"
                    : "text-gray-700 hover:bg-indigo-50"
                }`
              }
            >
              BMI Calculator
            </NavLink>

            {/* Mobile Auth Buttons */}
            <div className="mt-4 pt-4 border-t border-indigo-200">
              {!isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/sign-in");
                    }}
                    className="relative flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <FaLock size={16} />
                    <span>Login</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/sign-up");
                    }}
                    className="relative flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
                  >
                    <FaPen size={16} />
                    <span>Register</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {user?.profilePhoto &&
                  !user.profilePhoto.includes("default") ? (
                    <img
                      src={`http://localhost:5000${user.profilePhoto}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold bg-white text-indigo-600 text-sm shadow-sm">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>Profile</span>
                  <FaUser size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
