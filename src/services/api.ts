import axios from "axios";

// Set up the Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
});

export default api;
