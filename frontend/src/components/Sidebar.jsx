import { useState } from "react";
import {
  LayoutDashboard,
  ActivitySquare,
  BarChart3,
  ClipboardList,
  User,
  Menu,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-white shadow-xl h-screen p-4 pt-6 fixed left-0 top-0 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button onClick={() => setOpen(!open)} className="text-gray-700 mb-6">
        <Menu className="w-6 h-6" />
      </button>

      {/* Menu Items */}
      <div className="flex flex-col gap-6 mt-4">
        <SidebarItem
          to="/"
          icon={<LayoutDashboard />}
          text="Dashboard"
          open={open}
        />
        <SidebarItem to="/profile" icon={<User />} text="Profile" open={open} />
        <SidebarItem
          to="/predictions"
          icon={<ActivitySquare />}
          text="Predictions"
          open={open}
        />
        <SidebarItem
          to="/metrics"
          icon={<BarChart3 />}
          text="Metrics"
          open={open}
        />
        <SidebarItem
          to="/history"
          icon={<ClipboardList />}
          text="History"
          open={open}
        />
      </div>
    </div>
  );
}

// Reusable Component
function SidebarItem({ to, icon, text, open }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition"
    >
      <span className="text-gray-700">{icon}</span>
      {open && <p className="text-gray-700 font-medium">{text}</p>}
    </Link>
  );
}
