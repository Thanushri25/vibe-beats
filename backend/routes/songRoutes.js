

/*import express from "express";
import Song from "../models/Song.js";

const router = express.Router();

router.get("/:mood", async (req, res) => {
  try {
    const playlist = await Song.findOne({ mood: req.params.mood });
      console.log(playlist);
    if (!playlist) {
      return res.status(404).json({ msg: "No playlist found" });
    }

    res.json(playlist);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;*/
import express from "express";
import Song from "../models/Song.js";
console.log("✅ songRoutes loaded");

const router = express.Router();

// ✅ GET ALL PLAYLISTS FOR ADMIN
router.get("/", async (req, res) => {
  try {
    const playlists = await Song.find();
    res.json(playlists);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

export default router;


