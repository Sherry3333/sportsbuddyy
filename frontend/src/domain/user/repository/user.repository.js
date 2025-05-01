import { http } from "@/utils/request";

// API endpoints
const ENDPOINTS = {
  USER: "/api/user",
  LOGIN: "/api/user/login",
  REGISTER: "/api/user/register",
  LOGOUT: "/api/user/logout"
};

// HTTP methods
const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

/**
 * Unified request function
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @param {object} data - Request data
 * @returns {Promise} - API response
 */
const request = (endpoint, method = METHODS.GET, data = null) => {
  return http[method.toLowerCase()](endpoint, data);
};

// User related API calls
export const getUserInfo = () => {
  return request(ENDPOINTS.USER, METHODS.GET, { id: 1 });
};

export const checkUserLogin = (params) => {
  return request(ENDPOINTS.LOGIN, METHODS.POST, params);
};

export const registerUser = (data) => {
  return request(ENDPOINTS.REGISTER, METHODS.POST, data);
};

export const logout = (data) => {
  return request(ENDPOINTS.LOGOUT, METHODS.POST, data);
};
