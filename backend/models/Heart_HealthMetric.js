// models/Heart_HealthMetric.js
import mongoose from "mongoose";

const HeartHealthMetricSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metrics: {
      Age: { type: Number, required: true },
      Sex: { type: String, enum: ["Male", "Female"], required: true },
      Cholesterol: { type: Number, required: true },
      Systolic_BP: { type: Number, required: true },
      Diastolic_BP: { type: Number, required: true },
      HeartRate: { type: Number },

      Diabets: { type: Boolean, default: false },
      FamilyHistory: { type: Boolean, default: false },
      Smoking: { type: Boolean, default: false },
      Obesity: { type: Boolean, default: false },
      AlcoholConsumption: { type: Boolean, default: false },
      PreviousHealthProblem: { type: Boolean, default: false },
      MedicationUse: { type: Boolean, default: false },
      Meditation: { type: Boolean, default: false },

      ExerciseHoursPerWeek: { type: Number },
      Diet: {
        type: String,
        enum: ["Healthy", "Average", "Unhealthy", ""],
        default: "",
      },
      StressLevel: { type: Number },
      BMI: { type: Number },
      SleepHoursPerDay: { type: Number },
    },
  },
  { timestamps: true }
);

const HeartHealthMetric = mongoose.model(
  "HeartHealthMetric",
  HeartHealthMetricSchema
);

export default HeartHealthMetric;
