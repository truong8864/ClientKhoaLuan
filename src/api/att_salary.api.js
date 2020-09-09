import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/salarys";
  return axiosClient.get(url, { params });
};

const create = (data) => {
  const url = "/salarys";
  return axiosClient.post(url, data);
};

const update = (ID, data) => {
  const url = `salarys/${ID}`;
  return axiosClient.put(url, data);
};

const remove = (ID) => {
  const url = `salarys/${ID}`;
  return axiosClient.delete(url);
};

export default { get, create, update, remove };
