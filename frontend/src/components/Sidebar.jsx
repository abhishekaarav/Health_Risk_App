import { useState } from "react";
import {
  LayoutDashboard,
  ActivitySquare,
  BarChart3,
  ClipboardList,
  User,
  Menu,
  X,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [open] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-xl p-3 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          bg-gradient-to-b from-gray-50 to-gray-100
          h-screen fixed top-[80px] left-0 z-40 p-6 pt-8
          transition-all duration-300
          w-64
          shadow-xl
          border-r border-gray-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-200/30 to-transparent pointer-events-none"></div>

        {/* CLOSE MOBILE */}
        <button
          className="md:hidden text-gray-700 mb-6 hover:bg-gray-200 p-2 rounded-lg transition-all duration-300"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Brand Section */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-gray-800 font-bold text-lg">MedicareAI</h2>
              <p className="text-gray-500 text-xs">Prediction System</p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-2">
          <SidebarItem
            to="/dashboard"
            icon={<LayoutDashboard />}
            text="Dashboard"
            path={location.pathname}
            closeMobile={() => setMobileOpen(false)}
          />

          <SidebarItem
            to="/profile"
            icon={<User />}
            text="Profile"
            path={location.pathname}
            closeMobile={() => setMobileOpen(false)}
          />

          <SidebarItem
            to="/metrics"
            icon={<BarChart3 />}
            text="Metrics"
            path={location.pathname}
            closeMobile={() => setMobileOpen(false)}
          />

          <SidebarItem
            to="/history"
            icon={<ClipboardList />}
            text="History"
            path={location.pathname}
            closeMobile={() => setMobileOpen(false)}
          />

          <SidebarItem
            to="/sign-in"
            icon={<LogOut />}
            text="Sign Out"
            path={location.pathname}
            closeMobile={() => setMobileOpen(false)}
            isSignOut={true}
          />
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-xs text-center font-medium">
              Powered by Advanced ML
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarItem({ to, icon, text, closeMobile, path, isSignOut }) {
  const active = path === to;

  return (
    <Link
      to={to}
      onClick={closeMobile}
      className={`
        relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300
        group overflow-hidden
        ${
          isSignOut
            ? "text-red-600 hover:bg-red-50 hover:translate-x-1 border border-transparent hover:border-red-200"
            : active
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200"
              : "text-gray-700 hover:bg-gray-200 hover:translate-x-1"
        }
      `}
    >
      {/* Active Indicator - Left Border */}
      {active && !isSignOut && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
      )}

      {/* Hover Gradient Background for Regular Items */}
      {!active && !isSignOut && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-150 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}

      {/* SignOut Hover Background */}
      {isSignOut && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-red-100 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}

      {/* Icon */}
      <span
        className={`
        relative z-10 transition-all duration-300
        ${
          isSignOut
            ? "text-red-600 group-hover:text-red-700 group-hover:scale-110"
            : active
              ? "text-white"
              : "text-gray-600 group-hover:text-gray-900 group-hover:scale-110"
        }
      `}
      >
        {icon}
      </span>

      {/* Text */}
      <span
        className={`
        relative z-10 transition-all duration-300
        ${
          isSignOut
            ? "font-semibold text-red-600 group-hover:text-red-700 group-hover:translate-x-0.5"
            : active
              ? "font-bold text-white"
              : "font-medium group-hover:translate-x-0.5"
        }
      `}
      >
        {text}
      </span>

      {/* Active Pill Background Animation */}
      {active && !isSignOut && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 opacity-90"></div>
      )}
    </Link>
  );
}
