import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_BASE,
});

apiClient.interceptors.request.use(function (config) {
  if (process.env.X_API_KEY) {
    config.headers["X-API-KEY"] = process.env.X_API_KEY!;
  }
  return config;
});

export default apiClient;
