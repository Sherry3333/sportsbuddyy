import { create } from "zustand";
import { getUserInfo, checkUserLogin } from "../repository/user.repository";
import { resolve } from "path";
import { saveStorage } from "@/utils/helper";
export const userStore = create((set, get) => ({
  username: "",
  userId: -1,

  setUserInfo: () => {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then((res) => {
          const userInfo = res.data;
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  userLogin: (params) => {
    return new Promise((resolve, reject) => {
      checkUserLogin(params)
        .then((res) => {
          if (res.data.code === 200) {
            saveStorage("token", res.data.data);
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
