import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    disease: {
      type: String,
      required: true,
      lowercase: true, 
    },

    inputs: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },

    result: {
      risk_probability: {
        type: Number,
        min: 0,
        max: 1,
        required: true,
      },
      label: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
      },
      suggestions: {
        type: [String],
        default: [],
      },
    },


  },
  { timestamps: true }
);

export default mongoose.model("Prediction", predictionSchema);
