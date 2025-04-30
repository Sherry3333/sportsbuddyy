import { http } from "@/utils/request";

// API endpoints configuration
const API_ENDPOINTS = {
  USER: {
    GET_INFO: "/api/user",
    LOGIN: "/api/user/login",
    REGISTER: "/api/user/register",
    LOGOUT: "/api/user/logout"
  }
};

// API methods configuration
const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

/**
 * Unified API calling method
 * @param {string} endpoint - API endpoint from API_ENDPOINTS
 * @param {string} method - HTTP method from API_METHODS
 * @param {object} data - Request data
 * @param {object} config - Additional axios config
 * @returns {Promise} - API response
 */
const apiCall = async (endpoint, method = API_METHODS.GET, data = null, config = {}) => {
  try {
    const response = await http[method.toLowerCase()](endpoint, data, config);
    return response;
  } catch (error) {
    throw new Error(error.message || "API call failed");
  }
};

// User API methods
export const userApi = {
  getInfo: (params) => apiCall(API_ENDPOINTS.USER.GET_INFO, API_METHODS.GET, params),
  login: (data) => apiCall(API_ENDPOINTS.USER.LOGIN, API_METHODS.POST, data),
  register: (data) => apiCall(API_ENDPOINTS.USER.REGISTER, API_METHODS.POST, data),
  logout: () => apiCall(API_ENDPOINTS.USER.LOGOUT, API_METHODS.POST)
};
