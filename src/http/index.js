import axios from "axios";

const token = localStorage.getItem("adminToken");

const api = axios.create({
  baseURL: process.env.REACT_APP_ROOT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const login = (data) => api.post("/api/auth/admin/login", { ...data });
