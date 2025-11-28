import HeartHealthMetric from "../models/Heart_HealthMetric.js";
import axios from "axios";

export const heartPrediction = async (req, res) => {
  try {
    const userId = req.user?._id || null;

    const {
      Age,
      Sex,
      Cholesterol,
      Systolic_BP,
      Diastolic_BP,
      HeartRate,
      Diabets,
      FamilyHistory,
      Smoking,
      Obesity,
      AlcoholConsumption,
      ExerciseHoursPerWeek,
      Diet,
      PreviousHealthProblem,
      MedicationUse,
      StressLevel,
      BMI,
      SleepHoursPerDay,
      Meditation,
    } = req.body;

    // Basic validation
    if (!Age || !Sex || !Cholesterol || !Systolic_BP || !Diastolic_BP) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing. Please fill the form properly.",
      });
    }

    // Save metrics (non-fatal)
    let savedMetrics = null;
    try {
      savedMetrics = await HeartHealthMetric.create({
        userId,
        metrics: {
          Age,
          Sex,
          Cholesterol,
          Systolic_BP,
          Diastolic_BP,
          HeartRate,
          Diabets,
          FamilyHistory,
          Smoking,
          Obesity,
          AlcoholConsumption,
          ExerciseHoursPerWeek,
          Diet,
          PreviousHealthProblem,
          MedicationUse,
          StressLevel,
          BMI,
          SleepHoursPerDay,
          Meditation,
        },
      });
    } catch (dbErr) {
      console.error("HeartHealthMetric DB save error:", dbErr.message);
    }

    // 🔥 IMPORTANT: column names match Flask/model columns
    const flaskInput = {
      Age,
      Sex,
      Cholesterol,
      Systolic_BP,
      Diastolic_BP,
      BMI,
      Smoking,
      Obesity,
      Diet,
      Meditation,

      HeartRate,
      Diabets,
      FamilyHistory,
      AlcoholConsumption,
      ExerciseHoursPerWeek,
      PreviousHealthProblem,
      MedicationUse,
      StressLevel,
      SleepHoursPerDay,

      "Heart Rate": HeartRate,
      Diabetes: Diabets,
      "Family History": FamilyHistory,
      "Alcohol Consumption": AlcoholConsumption,
      "Exercise Hours Per Week": ExerciseHoursPerWeek,
      "Previous Heart Problems": PreviousHealthProblem,
      "Medication Use": MedicationUse,
      "Stress Level": StressLevel,
      "Sleep Hours Per Day": SleepHoursPerDay,
    };

    let flaskRes;
    try {
      flaskRes = await axios.post(
        "http://127.0.0.1:5000/predict/heart",
        flaskInput,
        { timeout: 15000 }
      );
    } catch (mlErr) {
      console.error("Flask heart model error:", mlErr.message);
      if (mlErr.response) {
        console.error("Flask response data:", mlErr.response.data);
      }

      return res.status(500).json({
        success: false,
        message: "Failed to get response from heart ML model.",
        error: mlErr.message,
      });
    }

    const result = flaskRes.data?.result;

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Invalid response from heart ML model.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Heart Risk Prediction Successful!",
      userMetrics: savedMetrics,
      prediction: result.label,
      confidence: result.risk_probability,
      suggestions: result.suggestions,
    });
  } catch (error) {
    console.error("Heart Prediction Error (outer):", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
