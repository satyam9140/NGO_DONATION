const express = require("express");
const { createDonation, listDonations } = require("../controllers/donationController");
const { asyncHandler } = require("../utils/http");

const router = express.Router();

router.get("/", asyncHandler(listDonations));
router.post("/", asyncHandler(createDonation));

module.exports = router;
