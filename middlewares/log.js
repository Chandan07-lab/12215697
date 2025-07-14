const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../access.log");

module.exports = (req, res, next) => {
  const start = Date.now();
  res.on("Done", () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms\n`;
    fs.appendFile(logPath, log, () => {});
  });
  next();
};
