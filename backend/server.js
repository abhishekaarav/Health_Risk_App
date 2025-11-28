import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser"; // <<< REQUIRED
import { connectDB } from "./lib/db.js";

import diabetesRoutes from "./routes/diabetes.routes.js";
import heartRoutes from "./routes/heart.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

// 1. CORS Setup — REQUIRED for cookies
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true, // Allow cookies
  })
);

// 2. Parse JSON
app.use(express.json({ limit: "4mb" }));

// 3. Parse cookies
app.use(cookieParser()); // <<< REQUIRED for verifyToken

// 4. Connect to MongoDB
await connectDB();

// 5. Test route
app.get("/api/start", (req, res) => {
  res.send("Server is live!");
});

// 6. API Routes
app.use("/api/disease", diabetesRoutes);
app.use("/api/heart", heartRoutes);
app.use("/api/auth", authRouter);

// 7. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  if (err.message && err.message.includes("Illegal arguments")) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// 8. Run the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
