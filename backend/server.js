/*import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import emotionRoutes from "./routes/emotionRoutes.js";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/emotion", emotionRoutes);
app.use("/api/songs", songRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
*/

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import emotionRoutes from "./routes/emotionRoutes.js";
import songRoutes from "./routes/songRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  credentials: true
}));

app.use(express.json());
app.use("/api/playlists", songRoutes);


// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/emotion", emotionRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
