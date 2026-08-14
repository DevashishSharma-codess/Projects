const jwt = require("jsonwebtoken");
const musicModel = require("../models/music.model");

function normalizeUri(filePath) {
  if (!filePath) return "";
  // Convert backslashes to forward slashes
  const cleanPath = filePath.replace(/\\/g, "/");
  return cleanPath.startsWith("uploads/") ? `/${cleanPath}` : `/uploads/${cleanPath}`;
}

async function createMusic(req, res) {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "You don't have an artist account",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const { title } = req.body;

    const music = await musicModel.create({
      title: title || req.file.originalname,
      uri: req.file.path, // Local file path
      artist: decoded.id,
    });

    const populatedMusic = await musicModel.findById(music._id).populate("artist", "username email role");

    return res.status(201).json({
      message: "Music uploaded successfully",
      music: {
        ...populatedMusic.toObject(),
        audioUrl: normalizeUri(populatedMusic.uri)
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: err.message,
    });
  }
}

async function getAllMusic(req, res) {
  try {
    const musicList = await musicModel.find().populate("artist", "username email role").sort({ createdAt: -1 });
    
    const formattedList = musicList.map((item) => ({
      ...item.toObject(),
      audioUrl: normalizeUri(item.uri),
    }));

    return res.status(200).json({
      music: formattedList,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch music" });
  }
}

async function getMyMusic(req, res) {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const musicList = await musicModel.find({ artist: decoded.id }).populate("artist", "username email role").sort({ createdAt: -1 });

    const formattedList = musicList.map((item) => ({
      ...item.toObject(),
      audioUrl: normalizeUri(item.uri),
    }));

    return res.status(200).json({
      music: formattedList,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  createMusic,
  getAllMusic,
  getMyMusic,
};