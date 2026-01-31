import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 w-full pt-[30px] md:pt-[2px] p-4 transition-all">
        <Outlet />
      </main>
    </div>
  );
}
