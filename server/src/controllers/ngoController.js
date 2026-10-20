const { readJson, appendJson } = require("../utils/jsonStore");
const { sendSuccess } = require("../utils/http");
const { ngoRegistrationSchema, validate } = require("../utils/validators");

async function getNgos(req, res) {
  const ngos = await readJson("ngos.json", []);
  const { category, q } = req.query;
  const filtered = ngos.filter((ngo) => {
    const matchesCategory = !category || category === "All" || ngo.category === category;
    const searchText = [ngo.name, ngo.category, ngo.location, ngo.description].join(" ").toLowerCase();
    const matchesQuery = !q || searchText.includes(String(q).toLowerCase());
    return matchesCategory && matchesQuery;
  });
  return sendSuccess(res, { ngos: filtered, count: filtered.length });
}

async function registerNgo(req, res) {
  const payload = validate(ngoRegistrationSchema, req.body);
  const registration = await appendJson("registrations.json", {
    ...payload,
    status: "under-review"
  });
  return sendSuccess(res, { registration }, 201);
}

async function listRegistrations(req, res) {
  const registrations = await readJson("registrations.json", []);
  return sendSuccess(res, { registrations, count: registrations.length });
}

module.exports = { getNgos, registerNgo, listRegistrations };
