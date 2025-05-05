import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", 
  headers: {
    "Content-Type": "application/json",
  },
});

// подставление токена
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
