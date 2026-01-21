

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ------------------ REGISTER ------------------
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hash });
    await user.save();

    res.json({ msg: "User registered" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ------------------ LOGIN ------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ msg: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
