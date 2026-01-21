import mongoose from "mongoose";
import Song from "./models/Song.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const playlists = [
  {
    mood: "happy",
    playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC"
  },
  {
    mood: "sad",
    playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1"
  },
  {
    mood: "romantic",
    playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXb9guK1CRZTR"
  },
  /*{
    mood: "gym",
    playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWUSyphfcc6aL"
  },*/
  {
    mood: "calm",
    playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO"
  },
  {
    mood: "angry", 
    playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP"  
  },
  {
    mood: "focus",
    playlistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS"
  }
];

(async () => {
  await Song.deleteMany({});
  await Song.insertMany(playlists);
  console.log("🎉 Spotify playlists inserted!");
  process.exit();
})();
