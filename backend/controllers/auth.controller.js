import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// SIGNUP
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        errorHandler(
          400,
          "This email is already registered. Please use another email."
        )
      );
    }

    next(error);
  }
};
//SIGNIN
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));


    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, 
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};


// SIGN OUT
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
