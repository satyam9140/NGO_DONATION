const { readJson, appendJson } = require("../utils/jsonStore");
const { sendSuccess } = require("../utils/http");
const { donationSchema, validate } = require("../utils/validators");

async function createDonation(req, res) {
  const payload = validate(donationSchema, req.body);
  const donation = await appendJson("donations.json", {
    ...payload,
    paymentStatus: "demo-recorded"
  });
  return sendSuccess(res, { donation }, 201);
}

async function listDonations(req, res) {
  const donations = await readJson("donations.json", []);
  return sendSuccess(res, { donations, count: donations.length });
}

module.exports = { createDonation, listDonations };
