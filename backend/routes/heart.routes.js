// routes/heart.routes.js
import express from "express";
import { heartPrediction } from "../controllers/heart.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// POST /api/heart/heart-predict
router.post("/heart-predict", verifyToken, heartPrediction);

export default router;
