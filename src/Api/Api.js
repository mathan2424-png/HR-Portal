import axios from "axios";

// Environment detection: supports Vite (import.meta.env) & Create-React-App/Node (process.env)
const APP_ENV =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_APP_ENV) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_ENV) ||
  "local";

let IMAGE_BASE_URL = "";
let BASE_URL = "";
let server = "";

switch (APP_ENV) {
  case "dev":
    IMAGE_BASE_URL = "http://192.168.88.5:5000/public";
    BASE_URL = "http://192.168.88.5:5000/api/admin";
    server = "http://192.168.88.5:5000";
    break;

  case "production":
    IMAGE_BASE_URL = "/public";
    BASE_URL = "/api/admin";
    server = "";
    break;

  case "local":
  default:
    IMAGE_BASE_URL = "http://192.168.88.5:5000/public";
    BASE_URL = "http://192.168.88.5:5000/api/admin";
    server = "http://192.168.88.5:5000";
    break;
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Request Interceptor: Attach Auth Token and proper Content-Type
apiClient.interceptors.request.use(
  function (config) {
    const token =
      localStorage.getItem("userToken") ||
      localStorage.getItem("hr_portal_token") ||
      localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized / Token Expired
apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("login") &&
      !error.config?.url?.includes("admin-login")
    ) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("hr_portal_token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("hr_portal_user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Image URL Resolver Helper
const getImageUrl = (path) => {
  if (!path) return "";
  if (typeof path === "object" && path.path) {
    path = path.path;
  }
  if (typeof path !== "string") return "";

  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

export {
  IMAGE_BASE_URL,
  BASE_URL,
  server,
  apiClient,
  apiClient as api,
  apiClient as clientApi,
  BASE_URL as API_URL,
  BASE_URL as CLIENT_API_URL,
  getImageUrl,
};

export default apiClient;
