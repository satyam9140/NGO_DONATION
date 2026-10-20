require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./routes");
const { clientDistDir } = require("./config/paths");
const { sendError } = require("./utils/http");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(isProduction ? "combined" : "dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-7", legacyHeaders: false }));

app.use("/api", apiRoutes);

if (fs.existsSync(clientDistDir)) {
  app.use(express.static(clientDistDir));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistDir, "index.html"));
  });
}

app.use((req, res) => sendError(res, 404, "Route not found"));

app.use((error, req, res, next) => {
  const status = error.status || 500;
  return sendError(res, status, error.message || "Server error");
});

module.exports = app;
