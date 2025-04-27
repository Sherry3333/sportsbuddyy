import {create} from "zustand";
import { _getSportsList } from "../repository/home.repository";
export const homeStore = create((set,get) => ({
  sports:[],// sports list
  
  getSportsList:() => {
    return new Promise((resolve,reject) => {
      _getSportsList().then((res) => {
        console.log('res:',res)
        if(res.code === 200){
          set({sports:res.data})
          resolve(res);
        }else{
          reject(res);
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
}))