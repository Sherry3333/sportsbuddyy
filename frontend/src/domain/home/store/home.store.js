import { create } from "zustand";
import { getSportId } from "../mapper/home.mapper";
import { _getSportsList, _getTeamListLocs,_createLoc } from "../repository/home.repository";
export const homeStore = create((set, get) => ({
  sports: [], // sports list
  selectIndex: 0, //selected index
  locList: [], // location list
  isModalOpen:false,// create team modal open state
  addLocLoading:false,// add location loading state

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
    const _id = getSportId(sports, selectIndex);
    if (!_id) {
      return;
    }
    set({addLocLoading:true})
    return new Promise((resolve, reject) => {
      _getTeamListLocs(_id)
        .then((res) => {
          set({ locList: res.data.map((item) => ({...item,label:item.name,value:item._id})) });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        }).finally(() => {
          set({addLocLoading:false})
        });
    });
  },

  //create location
  createLoc:(name) => {
    const sports = get().sports;
    const selectIndex = get().selectIndex;
    const _id = getSportId(sports, selectIndex);
    if (!_id) {
      return;
    }
    return new Promise((resolve,reject) => {
      _createLoc({name,sports_id:_id}).then((res) => {
        set({locList: [...get().locList,{...res.data,label:res.data.name,value:res.data.name}]})
        resolve()
      }).catch((error) => {
        reject(error);
      })
    })
  },

  setModalState: (isOpen) => {
    set({ isModalOpen: isOpen });
  },
}));
