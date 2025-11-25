import mongoose from "mongoose";

const heartHealthMetricSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    metrics: {
      Age: Number,
      Sex: String,
      Cholesterol: Number, 
      Systolic_BP: Number, 
      Diastolic_BP: Number, 
      HeartRate: Number,
      Diabets: Boolean, 
      FamilyHistory: Boolean, 
      Smoking: Boolean, 
      Obesity: Boolean, 
      AlcoholConsumption: Boolean,
      ExerciseHoursPerWeek: Number,
      Diet: String,
      PreviousHealthProblem: Boolean,
      MedicationUse: Boolean,
      StressLevel: Number,
      BMI: Number,
      SleepHoursPerDay: Number,
      
    },
  },
  { timestamps: true }
);

export default mongoose.model("HeartHealthMetric", heartHealthMetricSchema);
