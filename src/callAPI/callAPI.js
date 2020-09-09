import axios from "axios";
import qs from "qs";
import * as config from "./config";
export default function callAPI(endpoint, method = "GET", body) {
  return axios(
    {
      method: method,
      //url: `${config.REACT_URL_API}${endpoint}`,https://api-hr-manager.herokuapp.com/get-hre-profile
      url: `${config.REACT_URL_API}${endpoint}`,
      params: method === "GET" ? body : {},
      data: method !== "GET" ? body : {},
      withCredentials: true,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "access-token": localStorage.getItem("token"),
      },
    }
  ).catch((err) => {
    throw err;
  });
}
