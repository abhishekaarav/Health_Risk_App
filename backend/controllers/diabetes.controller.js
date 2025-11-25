import DiabetesHealthMetric from "../models/Diabetes_HealthMetric.js";

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

    // Flask API
    const flaskRes = {
      data: {
        prediction: "Testing Mode",
        confidence: 0.95,
      },
    };

    res.status(200).json({
      success: true,
      message: "Diabetes Prediction Successful!",
      userMetrics: savedMetrics,
      prediction: flaskRes.data.prediction,
      confidence: flaskRes.data.confidence,
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
