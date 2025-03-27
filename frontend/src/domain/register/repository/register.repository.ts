// src/domain/register/repository/register.repository.ts
import request from "@/utils/request";

export async function registerUser(data: any) {
  return request.post("/api/user/register", data);
}
