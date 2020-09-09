import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/leave-days";
  return axiosClient.get(url, { params });
};

const create = (data) => {
  const url = "/leave-days";
  return axiosClient.post(url, data);
};

const update = (ID, data) => {
  const url = `leave-days/${ID}`;
  return axiosClient.put(url, data);
};

const remove = (ID) => {
  const url = `leave-days/${ID}`;
  return axiosClient.delete(url);
};

export default { get, create, update, remove };
