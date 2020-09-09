import axiosClient  from "./axiosClient.api";
import * as config from "./config"

const baseURL=config.REACT_URL_AUTHENTICATION;

const login = (data) => {
  const url="/login"
  return axiosClient.post(url,
    data,{baseURL});
};

const checkLogged = () => {
  const url="/check-logged"
  return axiosClient.get(url,{baseURL});
};

const logout = () => {
  const url="/logout"
  return axiosClient.get(url,{baseURL});
};

const getRole = () => {
  const url="/role"
  return axiosClient.get(url,{baseURL});
};

export default { login, checkLogged, logout,getRole };
