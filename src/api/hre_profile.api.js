import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/profiles";
  return axiosClient.get(url, { params });
};

const getByCodeEmp = (CodeEmp) => {
  const url = `/profiles/${CodeEmp}`;
  return axiosClient.get(url);
};

const create = (data) => {
  const url = "/profiles";
  return axiosClient.post(url, data);
};

const update = (CodeEmp, data) => {
  const url = `profiles/${CodeEmp}`;
  return axiosClient.put(url, data);
};

const remove = (CodeEmp) => {
  const url = `profiles/${CodeEmp}`;
  return axiosClient.delete(url);
};

export default { get, getByCodeEmp, create, update, remove };
