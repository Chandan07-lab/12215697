const express = require("express");
const router = express.Router();
const {
    createShortUrl,
    getShortUrlStats
} = require("../controllers/shortulr_controller");

router.post("/shorturls", createShortUrl);
router.get("/shorturls/:shortcode", getShortUrlStats);

module.exports = router;
