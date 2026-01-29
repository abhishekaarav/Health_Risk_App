import express from "express";
import {
  getHistory,
  deleteHistory,
} from "../controllers/history.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/history", verifyToken, getHistory);
router.delete("/history/:id", verifyToken, deleteHistory);

export default router;
