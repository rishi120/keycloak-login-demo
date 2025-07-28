import axios from "axios";
import { API_SERVER_URL } from "../config";
import { initKeycloak } from "./utilities/keycloak";
import { getAccessToken } from "./utilities/tokenManager";

const axiosInstance = axios.create({
  baseURL: API_SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error))
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;

    // Handle unauthorized (logout)
    if (status === 401) {
      localStorage.removeItem("token");
      initKeycloak();
    }

    let message: string = "An unexpected error occurred";

    if (Array.isArray(data?.error)) {
      message = Object.values(data.error[0] || {})[0] || data.message;
    } else if (typeof data?.error === "string") {
      message = data.error;
    } else if (typeof data?.message === "string") {
      message = data.message;
    } else if (error?.message) {
      message = error.message;
    }

    // Assign to error object
    error.message = message;

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
