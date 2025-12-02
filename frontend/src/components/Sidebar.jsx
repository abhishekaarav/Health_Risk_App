import { useState } from "react";
import {
  LayoutDashboard,
  ActivitySquare,
  BarChart3,
  ClipboardList,
  User,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg p-2 rounded-lg"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* SIDEBAR MAIN */}
      <div
        className={`
    bg-white shadow-xl h-screen fixed top-[80px] left-0 z-40 p-4 pt-6 
    transition-all duration-300 
    
    ${open ? "w-64" : "w-20"} 
    ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >
        {/* CLOSE BUTTON ON MOBILE */}
        <button
          className="md:hidden text-gray-700 mb-6"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* DESKTOP TOGGLE BUTTON */}
        <button
          className="hidden md:block text-gray-700 mb-6"
          onClick={() => setOpen(!open)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col gap-6 mt-4">
          <SidebarItem
            to="/dashboard"
            icon={<LayoutDashboard />}
            text="Dashboard"
            open={open}
            closeMobile={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/profile"
            icon={<User />}
            text="Profile"
            open={open}
            closeMobile={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/predictions"
            icon={<ActivitySquare />}
            text="Predictions"
            open={open}
            closeMobile={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/metrics"
            icon={<BarChart3 />}
            text="Metrics"
            open={open}
            closeMobile={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="/history"
            icon={<ClipboardList />}
            text="History"
            open={open}
            closeMobile={() => setMobileOpen(false)}
          />
        </div>
      </div>
    </>
  );
}

// Reusable Sidebar Item
function SidebarItem({ to, icon, text, open, closeMobile }) {
  return (
    <Link
      to={to}
      onClick={closeMobile}
      className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 p-3 rounded-lg transition font-medium"
    >
      <span className="text-gray-700">{icon}</span>
      {open && <p className="text-gray-700">{text}</p>}
    </Link>
  );
}
