import express from "express";
import { diabetesPrediction } from "../controllers/diabetes.controller.js";
import { verifyToken } from "../utils/verifyToken.js"; 

const router = express.Router();

router.post("/diabetes-predict", verifyToken, diabetesPrediction);

export default router;
