import { create } from "zustand";
import { _getSportsList, _getTeamListLocs } from "../repository/home.repository";
export const homeStore = create((set, get) => ({
  sports: [], // sports list
  selectIndex: 0, //selected index
  locList: [], // location list

  getSportsList: () => {
    return new Promise((resolve, reject) => {
      _getSportsList()
        .then((res) => {
          if (res.code === 200) {
            set({ sports: res.data });
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  setSelectIndex: (index) => {
    set({ selectIndex: index });
  },

  getLocsList: () => {
    const sports = get().sports;
    const selectIndex = get().selectIndex;
    const _id = sports && sports[selectIndex] ? sports[selectIndex]._id : null;
    if (!_id) {
      return;
    }
    return new Promise((resolve, reject) => {
      _getTeamListLocs(_id)
        .then((res) => {
          set({ locList: res.data });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}));
