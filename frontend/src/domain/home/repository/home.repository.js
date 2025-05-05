import { http } from "@/utils/request";

//get sports list
export const _getSportsList = () => {
  return http.get("/api/sport/list");
};

export const _getTeamListLocs = (id) => {
  return http.get(`/api/location/list/${id}`);
};

export const _createLoc = (data) => {
  return http.post("/api/location/create", data);
}

export const _createTeam = (data) => {
  return http.post("/api/team/create", data);
};

//get team list by location id
export const _getTeamList = (id) => {
  return http.get(`/api/team/list/${id}`);
}

export const _getTeamUsersList = (id) => {
  return http.get(`/api/team/users/${id}`);
}

export const _joinTeam = (id) => {
  return http.post(`/api/team/join/${id}`);
}

export const _quitTeam = (id) => {
  return http.delete(`/api/team/quit/${id}`);
}