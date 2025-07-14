const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./middlewares/log");
const shortUrlRoutes = require("./routes/shorturl_routes");
dotenv.config();


const app = express();
app.use(express.json());
app.use(logger);
app.use("/", shortUrlRoutes);

const PORT = process.env.PORT || 3000;
  mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected ");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("connection failed:", err.message);
  });


