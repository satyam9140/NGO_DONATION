const { appendJson } = require("../utils/jsonStore");
const { sendSuccess } = require("../utils/http");
const { contactSchema, validate } = require("../utils/validators");

async function createContact(req, res) {
  const payload = validate(contactSchema, req.body);
  const contact = await appendJson("contacts.json", payload);
  return sendSuccess(res, { contact }, 201);
}

module.exports = { createContact };
