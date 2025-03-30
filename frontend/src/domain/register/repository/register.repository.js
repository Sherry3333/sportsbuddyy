import request from "@/utils/request";

export async function registerUser(data) {
  return request.post("/api/user/register", data);
}
