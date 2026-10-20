import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 12000,
  headers: {
    "Content-Type": "application/json"
  }
});

export async function fetchNgos(params = {}) {
  const { data } = await api.get("/ngos", { params });
  return data;
}

export async function registerNgo(payload) {
  const { data } = await api.post("/ngos/register", payload);
  return data;
}

export async function createDonation(payload) {
  const { data } = await api.post("/donations", payload);
  return data;
}

export async function fetchDashboard() {
  const { data } = await api.get("/impact/summary");
  return data;
}

export async function createContact(payload) {
  const { data } = await api.post("/contact", payload);
  return data;
}

export default api;
