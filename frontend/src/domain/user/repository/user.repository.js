import {http} from '@/utils/request';

//get user info
export const getUserInfo = () => {
  return http.get('/api/user',{id:1})
}

export const checkUserLogin = (params) => {
  return http.post('/api/user/login',params)
}

export async function registerUser(data) {
  return http.post("/api/user/register", data);
}

export async function logout() {
  return http.post("/api/user/logout");
}