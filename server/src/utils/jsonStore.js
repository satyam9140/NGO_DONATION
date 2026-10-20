const fs = require("fs/promises");
const path = require("path");
const { dataDir } = require("../config/paths");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJson(fileName, fallback = []) {
  try {
    await ensureDataDir();
    const filePath = path.join(dataDir, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJson(fileName, payload) {
  await ensureDataDir();
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2));
  return payload;
}

async function appendJson(fileName, payload) {
  const entries = await readJson(fileName, []);
  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    ...payload
  };
  entries.unshift(item);
  await writeJson(fileName, entries);
  return item;
}

module.exports = { readJson, writeJson, appendJson };
