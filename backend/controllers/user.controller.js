import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// UPDATE PROFILE
export const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      success: true,
      user: rest,
    });
  } catch (err) {
    next(err);
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return next(errorHandler(404, "User not found"));

    const isMatch = bcryptjs.compareSync(currentPassword, user.password);
    if (!isMatch)
      return next(errorHandler(401, "Current password is incorrect"));

    user.password = bcryptjs.hashSync(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// UPLOAD PROFILE PHOTO ✅
export const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No image uploaded"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePhoto: `/uploads/${req.file.filename}` },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      success: true,
      user: rest,
    });
  } catch (err) {
    next(err);
  }
};
