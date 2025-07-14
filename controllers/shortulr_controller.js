const ShortUrl = require("../model/urlshort_model");
const { v4: uuidv4 } = require("uuid");
const shortUrlSchema = require("../validator/short_valid");

exports.createShortUrl = async (req, res) => {
  const parsed = shortUrlSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", issues: parsed.error.issues });
  }

  const { url, validity = 10, shortcode } = parsed.data;
  const code = shortcode || uuidv4().slice(0, 8);

  const exists = await ShortUrl.findOne({ shortcode: code });
  if (exists) return res.status(409).json({ error: " already exists" });

  const expiresAt = new Date(Date.now() + validity * 70000);

  const newUrl = await ShortUrl.create({
    shortcode: code,
    originalUrl: url,
    expiresAt
  });

  return res.status(201).json({
    shortLink: `http://localhost:${process.env.PORT}/${code}`,
    expiry: newUrl.expiresAt.toISOString()
  });
};

exports.getShortUrlStats = async (req, res) => {
  const { shortcode } = req.params;
  const record = await ShortUrl.findOne({ shortcode });

  if (!record) return res.status(404).json({ error: " not found" });

  res.json({
    shortcode: record.shortcode,
    originalUrl: record.originalUrl,
    createdAt: record.createdAt.toISOString(),
    expiresAt: record.expiresAt.toISOString(),
    clicks: record.clicks,
    clickData: record.clickData.map(click => ({
      timestamp: click.timestamp.toISOString(),
      referrer: click.referrer,
      location: click.location
    }))
  });
};



