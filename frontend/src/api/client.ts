import axios from "axios";
import { Platform } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.37:3000/api/v1"
    : "http://localhost:3000/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor for Auto-Logout
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
