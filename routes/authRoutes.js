import User from "../models/User.js";
import express from "express";
import crypto from "crypto";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email } = req.body;
    const existing = await User.findOne({ email: email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const token = crypto.randomBytes(32).toString("hex");
    const user = new User({ name, email, token });
    await user.save();
    res.status(201).json({
      message: "User registered! Use access token to use the API",
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error in Register Module" });
  }
});

// Get user token
router.post("/token", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User not found" });

    res.status(200).json({ token: user.token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error in Token Module" });
  }
});

export default router;
