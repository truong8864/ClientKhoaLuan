import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/positions";
  return axiosClient.get(url, { params });
};

const getByCode = (Code) => {
  const url = `/positions/${Code}`;
  return axiosClient.get(url);
};

const create = (data) => {
  const url = "/positions";
  return axiosClient.post(url, { data });
};

const update = (Code, data) => {
  const url = `positions/${Code}`;
  return axiosClient.put(url, { data });
};

const remove = (Code) => {
  const url = `positions/${Code}`;
  return axiosClient.delete(url);
};

export default { get, getByCode, create, update, remove };
