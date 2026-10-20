const express = require("express");
const { getNgos, registerNgo, listRegistrations } = require("../controllers/ngoController");
const { asyncHandler } = require("../utils/http");

const router = express.Router();

router.get("/", asyncHandler(getNgos));
router.post("/register", asyncHandler(registerNgo));
router.get("/registrations", asyncHandler(listRegistrations));

module.exports = router;
