import { http } from "@/utils/request";// User related API calls

export const getUserInfo = () => {
  return http.get("/api/user");
};

export const checkUserLogin = (params) => {
  return http.post("/api/user/login",params);
};

export const registerUser = (params) => {
  return http.post("/api/user/register",params);
};

export const logout = () => {
  return http.post("/api/user/logout");
};
