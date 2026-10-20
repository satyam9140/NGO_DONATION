const express = require("express");
const { getImpactSummary } = require("../controllers/dashboardController");
const { asyncHandler } = require("../utils/http");

const router = express.Router();

router.get("/summary", asyncHandler(getImpactSummary));

module.exports = router;
