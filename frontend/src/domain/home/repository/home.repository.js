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
