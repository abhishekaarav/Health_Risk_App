import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Predictors from "./pages/Predictors";
import Profile from "./pages/Profile";
import Metrics from "./pages/Metrics";
import HeartPrediction from "./components/HeartPrediction";
import DiabetesPrediction from "./components/DiabetesPrediction";
import DiabetesResult from "./components/DiabetesResult"; // ⬅ NEW

import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/predictors" element={<Predictors />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Prediction Pages */}
        <Route path="/heart-predict" element={<HeartPrediction />} />
        <Route path="/diabetes-predict" element={<DiabetesPrediction />} />

        {/* Result Page — New Route */}
        <Route path="/diabetes-result" element={<DiabetesResult />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
