import {create} from 'zustand';
import {getUserInfo,checkUserLogin} from '../repository/user.repository';
import { resolve } from 'path';
export const userStore = create((set,get) => ({
  username:'',
  userId:-1,

  setUserInfo:() => {
    return new Promise((resolve,reject) => {
      getUserInfo().then((res) => {
        const userInfo = res.data;
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  },

 userLogin:(params) => {
  return new Promise((resolve,reject) => {
    checkUserLogin(params).then((res) => {
      const loginInfo = res.data;
      if(loginInfo.code === 200){
        set({
          username:loginInfo.username,
          userId:loginInfo.userId
        })
      }
      window.location.href = '/';
    })
  })
 }

}))