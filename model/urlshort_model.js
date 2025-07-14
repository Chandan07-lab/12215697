const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  referrer: { type: String, default: "Direct" },
  location: { type: String, default: "Unknown" }
});

const shortUrlSchema = new mongoose.Schema({
  shortcode: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  clicks: { type: Number, default: 0 },
  clickData: [clickSchema]
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
