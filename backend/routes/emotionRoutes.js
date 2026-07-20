import express from "express";
import Song from "../models/Song.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text required" });

    const lower = text.toLowerCase();

    let mood = "calm";

    if (/(sad|depress|cry|upset)/.test(lower)) mood = "sad";
    else if (/(angry|anger|mad|annoy|irritat|frustrat)/.test(lower)) mood = "angry";
    else if (/(happy|joy|excited|good|great)/.test(lower)) mood = "happy";
    else if (/(love|romance|crush|heart)/.test(lower)) mood = "romantic";
    else if (/(focus|study|work|productive)/.test(lower)) mood = "focus";
    else if (/(calm|relax|peace|chill)/.test(lower)) mood = "calm";

    console.log("Emotion detected:", mood);

    const playlist = await Song.findOne({ mood });

    console.log("Playlist found:", playlist);

    res.json({
      mood,
      playlist
    });

  } catch (err) {
    console.error("Emotion API crashed:", err);
    res.status(500).json({ error: "Emotion API failed" });
  }
});

export default router;
