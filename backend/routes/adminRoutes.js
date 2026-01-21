// routes/adminRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Song from "../models/Song.js";

const router = express.Router();

// Create admin (run once using Thunder Client)
router.post("/create", async (req, res) => {
  try {
    const { adminId, password } = req.body;
    if (!adminId || !password)
      return res.status(400).json({ msg: "adminId and password required" });

    const exists = await Admin.findOne({ adminId });
    if (exists) return res.status(400).json({ msg: "Admin already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await Admin.create({ adminId, passwordHash: hash });
    res.json({ msg: "Admin created" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Admin login (JWT version)
router.post("/login", async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admin = await Admin.findOne({ adminId });
    if (!admin)
      return res.status(401).json({ success: false, msg: "Invalid credentials" });

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok)
      return res.status(401).json({ success: false, msg: "Invalid credentials" });

    const token = jwt.sign(
      { adminId: admin.adminId },
      "SUPER_SECRET_ADMIN_KEY",
      { expiresIn: "1d" }
    );

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Protected stats route (JWT check)
router.get("/stats", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ msg: "Forbidden" });

    jwt.verify(token, "SUPER_SECRET_ADMIN_KEY");

    const totalUsers = await User.countDocuments();
    const totalSongs = await Song.countDocuments();
    const playlists = await Song.find().lean();

    res.json({ totalUsers, totalSongs, playlists });
  } catch (err) {
    return res.status(403).json({ msg: "Forbidden" });
  }
});

export default router;
