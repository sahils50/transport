import axios from "axios";

// Check if the current browser URL is localhost
const isLocal = window.location.hostname === "localhost";

const apiClient = axios.create({
  // Use the IP if not on localhost, otherwise use localhost
  baseURL: isLocal
    ? "http://localhost:3000/api/v1"
    : "http://192.168.1.37:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
