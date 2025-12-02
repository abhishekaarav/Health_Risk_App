import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

// PUBLIC PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

// DASHBOARD LAYOUT (with sidebar)
import DashboardLayout from "./pages/DashboardLayout";

// Dashboard internal pages
import Dashboard from "./components/Dashboard";
import Predictors from "./pages/Predictors";
import Profile from "./pages/Profile";
import Metrics from "./pages/Metrics";

// Prediction Components (NO SIDEBAR)
import HeartPrediction from "./components/HeartPrediction";
import DiabetesPrediction from "./components/DiabetesPrediction";
import HeartResult from "./components/HeartResult";
import DiabetesResult from "./components/DiabetesResult";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* SIDEBAR PAGES */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/predictions" element={<Predictors />} />
          <Route path="/metrics" element={<Metrics />} />
        </Route>

        {/* WITHOUT SIDEBAR */}
        <Route path="/heart-predict" element={<HeartPrediction />} />
        <Route path="/diabetes-predict" element={<DiabetesPrediction />} />
        <Route path="/heart-result" element={<HeartResult />} />
        <Route path="/diabetes-result" element={<DiabetesResult />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
