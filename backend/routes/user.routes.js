import express from "express";
import {
  updateProfile,
  changePassword,
  uploadPhoto,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.put("/update-profile", verifyToken, updateProfile);

router.put("/change-password", verifyToken, changePassword);

router.put(
  "/upload-photo",
  verifyToken,
  upload.single("profilePhoto"),
  uploadPhoto
);

export default router;
