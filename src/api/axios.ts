import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
});

api.interceptors.request.use((cfg) => {
  // example: attach token if exists
  const token = localStorage.getItem("authToken");
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    // centralize error handling if needed
    return Promise.reject(err);
  }
);

export default api;
