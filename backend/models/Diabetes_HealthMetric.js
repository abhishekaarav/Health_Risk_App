import mongoose from "mongoose";

const healthMetricSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    metrics: {
      Pregnancies: Number,
      Glucose: Number,
      BloodPressure: Number,
      SkinThickness: Number,
      Insulin: Number,
      BMI: Number,
      DiabetesPedigreeFunction: Number,
      Age: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Diabetes_HealthMetric", healthMetricSchema);
