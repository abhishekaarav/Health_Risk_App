import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    const user = await User.findById(decoded._id);

    // 🔥 THIS IS THE KEY
    if (!user) {
      res.clearCookie("access_token");
      return next(errorHandler(401, "User no longer exists"));
    }

    req.user = user;
    next();
  });
};
