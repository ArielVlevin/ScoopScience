import axios from "../../../node_modules1/axios";

// Set up the Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
