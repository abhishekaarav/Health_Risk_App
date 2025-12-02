
import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Right side content (changes using Outlet) */}
      <div className="flex-1 ml-20 md:ml-64 p-4 transition-all">
        <Outlet />
      </div>
    </div>
  );
}
