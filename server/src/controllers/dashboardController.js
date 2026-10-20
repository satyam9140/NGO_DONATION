const { readJson } = require("../utils/jsonStore");
const { sendSuccess } = require("../utils/http");

const basePrograms = [
  { name: "Digital Classrooms", progress: 82, target: 100, category: "Education" },
  { name: "Mobile Health Camps", progress: 66, target: 100, category: "Healthcare" },
  { name: "Flood Relief Kits", progress: 74, target: 100, category: "Disaster Relief" },
  { name: "Clean Water Units", progress: 58, target: 100, category: "Environment" }
];

async function getImpactSummary(req, res) {
  const donations = await readJson("donations.json", []);
  const registrations = await readJson("registrations.json", []);
  const donors = new Set(donations.map((item) => item.donor?.email).filter(Boolean));
  const totalDonations = donations.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const donationBoost = Math.floor(totalDonations / 25000);

  const programs = basePrograms.map((program, index) => ({
    ...program,
    progress: Math.min(98, program.progress + Math.floor(donationBoost / (index + 3)))
  }));

  return sendSuccess(res, {
    stats: {
      totalDonations: totalDonations || 3080000,
      donorCount: donors.size || 1240,
      registrations: registrations.length || 28,
      beneficiariesReached: 63250 + Math.floor((totalDonations || 0) / 300)
    },
    programs,
    donations,
    registrations
  });
}

module.exports = { getImpactSummary };
