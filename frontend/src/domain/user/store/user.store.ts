import {create} from 'zustand';
import {getUserInfo} from '../repository/user.repository';
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
  }
}))