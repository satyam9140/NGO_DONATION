const path = require("path");

const rootDir = path.resolve(__dirname, "..", "..");
const dataDir = path.join(rootDir, "data");
const clientDistDir = path.resolve(rootDir, "..", "client", "dist");

module.exports = { rootDir, dataDir, clientDistDir };
