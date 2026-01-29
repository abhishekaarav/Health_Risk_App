import DiabetesHealthMetric from "../models/Diabetes_HealthMetric.js";
import PredictionHistory from "../models/PredictionHistory.js";
import axios from "axios";

export const diabetesPrediction = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      Pregnancies,
      Glucose,
      DiastolicBP,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age,
    } = req.body;

    // Save to MongoDB
    const savedMetrics = await DiabetesHealthMetric.create({
      userId,
      metrics: {
        Pregnancies,
        Glucose,
        BloodPressure: DiastolicBP,
        SkinThickness,
        Insulin,
        BMI,
        DiabetesPedigreeFunction,
        Age,
      },
    });

    // Prepare input for Flask
    const flaskInput = {
      Pregnancies,
      Glucose,
      BloodPressure: DiastolicBP,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age,
    };

    // *** FIXED — CORRECT URL + CORRECT RESPONSE FORMAT ***
    const flaskRes = await axios.post(
      "http://127.0.0.1:5000/predict/diabetes",
      flaskInput
    );

    const result = flaskRes.data.result;

    // Save prediction history
    await PredictionHistory.create({
      userId,
      disease: "Diabetes",
      prediction: result.label,
      confidence: result.risk_probability,
      suggestions: result.suggestions,
    });

    // Return correct values to frontend
    res.status(200).json({
      success: true,
      message: "Diabetes Prediction Successful!",
      userMetrics: savedMetrics,
      prediction: result.label, // LOW, MEDIUM, HIGH
      confidence: result.risk_probability, // 0–1
      suggestions: result.suggestions, // array of advice
    });
  } catch (error) {
    console.error("Diabetes Prediction Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
