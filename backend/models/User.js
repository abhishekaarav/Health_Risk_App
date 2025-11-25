import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true }, 
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true }, 

    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
    age: { type: Number, default: null },
    heightCm: { type: Number, default: null },
    weightKg: { type: Number, default: null },
  },
  { timestamps: true }
);


export default mongoose.models.User || mongoose.model("User", userSchema);
