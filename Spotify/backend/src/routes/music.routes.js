const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { createMusic, getAllMusic, getMyMusic } = require("../controllers/music.controller");

router.post("/upload", upload.single("music"), createMusic);
router.get("/", getAllMusic);
router.get("/my-music", getMyMusic);

module.exports = router;