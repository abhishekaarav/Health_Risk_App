import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaLock, FaPen } from "react-icons/fa";
import logo from "../assets/MedicareAiLogo2.png";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const navItem =
    "relative transition text-black hover:text-blue-600 font-medium";

  const activeNav =
    "text-blue-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-indigo-200 shadow-md">
      <div className="px-14 py-4 flex items-center justify-between relative">
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <img
            src={logo}
            alt="MedicareAI"
            className="h-45 cursor-pointer ml-5"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="hidden md:flex flex-1 justify-center gap-10 ml-50">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItem} text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navItem} text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/faqs"
            className={({ isActive }) =>
              `${navItem} text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            FAQs
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navItem} text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            Predictors
          </NavLink>
          <NavLink
            to="/bmi-calculator"
            className={({ isActive }) =>
              `${navItem} text-[22px] font-bold ${isActive ? activeNav : ""}`
            }
          >
            BMI Calculator
          </NavLink>
        </div>

        {/* RIGHT AUTH */}
        <div className="hidden md:flex items-center px-12">
          {!isLoggedIn ? (
            <div className="flex items-center gap-8">
              <NavLink
                to="/sign-in"
                className="relative flex items-center gap-3 px-4 py-2 text-[22px] font-semibold border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition rounded-md pr-6"
              >
                <span className="absolute -left-4 w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 text-white">
                  <FaLock size={16} />
                </span>
                <span className="ml-4">Login</span>
              </NavLink>

              <NavLink
                to="/sign-up"
                className="relative flex items-center gap-3 px-4 py-2 text-[22px] font-semibold bg-blue-900 text-white rounded-md pr-6"
              >
                <span className="absolute -left-4 w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 text-white border">
                  <FaPen size={16} />
                </span>
                <span className="ml-4">Register</span>
              </NavLink>
            </div>
          ) : /* 🔥 ONLY THIS PART MODIFIED */
          user?.profilePhoto && !user.profilePhoto.includes("default") ? (
            <img
              src={`http://localhost:5000${user.profilePhoto}`}
              alt="Profile"
              onClick={() => navigate("/profile")}
              className="w-15 h-15 rounded-full cursor-pointer border hover:scale-105 transition"
            />
          ) : (
            <div
              onClick={() => navigate("/profile")}
              className="w-15 h-15 rounded-full cursor-pointer border flex items-center justify-center font-bold text-indigo-600 bg-indigo-100 hover:scale-105 transition"
            >
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-100 px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-4 font-medium">
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)}>
              About Us
            </NavLink>
            <NavLink to="/faqs" onClick={() => setIsOpen(false)}>
              FAQs
            </NavLink>
            <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>
              Predictors
            </NavLink>
            <NavLink to="/bmi-calculator" onClick={() => setIsOpen(false)}>
              BMI Calculator
            </NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink to="/sign-in">Login</NavLink>
                <NavLink to="/sign-up">Register</NavLink>
              </>
            ) : (
              <NavLink to="/profile">Profile</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
