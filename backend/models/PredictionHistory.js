import mongoose from "mongoose";

const predictionHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    disease: {
      type: String,
      required: true, // "Heart" | "Diabetes"
    },

    prediction: {
      type: String, // LOW / MEDIUM / HIGH
      required: true,
    },

    confidence: {
      type: Number, // 0 - 1
      required: true,
    },

    suggestions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("PredictionHistory", predictionHistorySchema);
