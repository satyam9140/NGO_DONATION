const express = require("express");
const { createContact } = require("../controllers/contactController");
const { asyncHandler } = require("../utils/http");

const router = express.Router();

router.post("/", asyncHandler(createContact));

module.exports = router;
