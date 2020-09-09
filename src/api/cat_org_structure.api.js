import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/org-structures";
  return axiosClient.get(url, { params });
};

const getByCode = (Code) => {
  const url = `/org-structures/${Code}`;
  return axiosClient.get(url);
};

const create = (data) => {
  const url = "/org-structures";
  return axiosClient.post(url, { data });
};

const update = (Code, data) => {
  const url = `org-structures/${Code}`;
  return axiosClient.put(url, { data });
};

const remove = (Code) => {
  const url = `org-structures/${Code}`;
  return axiosClient.delete(url);
};

export default { get, getByCode, create, update, remove };
