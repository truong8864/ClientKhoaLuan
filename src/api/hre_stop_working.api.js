import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/stop-workings";
  return axiosClient.get(url, { params });
};

const create = (data) => {
  const url = "/stop-workings";
  return axiosClient.post(url, data);
};

const update = (ID, data) => {
  const url = `stop-workings/${ID}`;
  return axiosClient.put(url, data);
};

const remove = (ID) => {
  const url = `stop-workings/${ID}`;
  return axiosClient.delete(url);
};

export default { get, create, update, remove };
