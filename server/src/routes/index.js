const express = require("express");
const ngoRoutes = require("./ngoRoutes");
const donationRoutes = require("./donationRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const contactRoutes = require("./contactRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ ok: true, app: "UnityAid API", timestamp: new Date().toISOString() });
});

router.use("/ngos", ngoRoutes);
router.use("/donations", donationRoutes);
router.use("/impact", dashboardRoutes);
router.use("/contact", contactRoutes);

module.exports = router;
