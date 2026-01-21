// models/Admin.js
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Admin", AdminSchema);
