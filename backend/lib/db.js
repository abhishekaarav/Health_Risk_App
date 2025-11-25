import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully!");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/health-risk-app`);

  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};
