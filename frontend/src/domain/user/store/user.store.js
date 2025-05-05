import { create } from "zustand";
import { getUserInfo, checkUserLogin, registerUser, logout } from "../repository/user.repository";
import { saveStorage } from "@/utils/helper";
export const userStore = create(() => ({
  username: "",
  userId: -1,

  getUserInfo: () => {
    return new Promise((resolve, reject) => {
      getUserInfo()
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
      checkUserLogin(params)
        .then((res) => {
          if (res.code === 200) {
            saveStorage("token", res.data);
            resolve(res);
          }
        })
    });
  },
  userRegister: (params) => {
    return new Promise((resolve, reject) => {
      registerUser(params).then((res) => {
        if (res.code === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  userLogout: () => {
    return new Promise((resolve,reject) => {
      logout()
        .then((res) => {
          resolve(res)
        }).catch((error) => {
          reject(error);
        });
    },);
  }
}));
