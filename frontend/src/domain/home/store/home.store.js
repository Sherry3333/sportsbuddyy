import { create } from "zustand";
import { getSportId } from "../mapper/home.mapper";
import {
  _getSportsList,
  _getTeamListLocs,
  _createLoc,
  _createTeam,
  _getTeamList,
  _getTeamUsersList,
  _joinTeam,
  _quitTeam,
  _getMyTeamList
} from "../repository/home.repository";
export const homeStore = create((set, get) => ({
  sports: [], // sports list
  selectIndex: 0, //selected index
  locList: [], // location list
  selectLocId: "", // selected location id
  teamList: [], //team list
  isModalOpen: false, // create team modal open state
  addLocLoading: false, // add location loading state
  activeCardId: null, // active card id
  teamDetailUsersList: [], // team detail about users
  isJoinChange:false,// join team change state
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
    set({ addLocLoading: true });
    return new Promise((resolve, reject) => {
      _getTeamListLocs(_id)
        .then((res) => {
          const newLocList = res.data.map((item) => ({
            ...item,
            label: item.name,
            value: item._id
          }));
          set({ locList: newLocList });
          set({ selectLocId: newLocList?.[0]?._id ?? "" });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          set({ addLocLoading: false });
        });
    });
  },

  //create location
  createLoc: (name) => {
    const sports = get().sports;
    const selectIndex = get().selectIndex;
    const _id = getSportId(sports, selectIndex);
    if (!_id) {
      return;
    }
    return new Promise((resolve, reject) => {
      _createLoc({ name, sports_id: _id })
        .then((res) => {
          set({
            locList: [...get().locList, { ...res.data, label: res.data.name, value: res.data._id }]
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //team list
  getTeamList: () => {
    const selectLocId = get().selectLocId;
    if (!selectLocId) return;
    return new Promise((resolve, reject) => {
      _getTeamList(selectLocId)
        .then((res) => {
          set({ teamList: res.data });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  createTeam: (params) => {
    return new Promise((resolve, reject) => {
      _createTeam(params)
        .then((res) => {
          set({ teamList: [...get().teamList, res.data] });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getTeamUsersList: () => {
    const activeCardId = get().activeCardId;
    console.log("activeCardId:",activeCardId)
    if (!activeCardId){
      set({ teamDetailUsersList: [] });
      return;
    }

    return new Promise((resolve, reject) => {
      _getTeamUsersList(activeCardId)
        .then((res) => {
          set({ teamDetailUsersList: res.data });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  joinTeam: (id) => {
    return new Promise((resolve, reject) => {
      _joinTeam(id)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  quitTeam: (id) => {
    return new Promise((resolve, reject) => {
      _quitTeam(id)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  changeSelectLocId: (id) => {
    set({ selectLocId: id });
  },
  setModalState: (isOpen) => {
    set({ isModalOpen: isOpen });
  },
  setActiveCardId: (id) => {
    set({ activeCardId: id });
  },
  setChangeStatus: () => {
    set({ isJoinChange: !get().isJoinChange });
  }
}));
