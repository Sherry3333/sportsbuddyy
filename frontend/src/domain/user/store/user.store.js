import { create } from "zustand";
import { userApi } from "../repository/user.repository";
import { saveStorage } from "@/utils/helper";

export const userStore = create((set, get) => ({
  username: "",
  userId: -1,

  getUserInfo: () => {
    return new Promise((resolve, reject) => {
      userApi
        .getInfo({ id: 1 })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  userLogin: (params) => {
    return new Promise((resolve) => {
      userApi.login(params).then((res) => {
        if (res.code === 200) {
          saveStorage("token", res.data);
          resolve(res);
        }
      });
    });
  },

  userRegister: (params) => {
    return new Promise((resolve, reject) => {
      userApi
        .register(params)
        .then((res) => {
          if (res.code === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}));
