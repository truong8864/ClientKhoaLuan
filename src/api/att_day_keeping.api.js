import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/day-keepings";
  return axiosClient.get(url, { params });
};

const create = (data) => {
  const url = "/day-keepings";
  return axiosClient.post(url, data);
};

const update = (ID, data) => {
  const url = `day-keepings/${ID}`;
  return axiosClient.put(url, data);
};

const remove = (ID) => {
  const url = `day-keepings/${ID}`;
  return axiosClient.delete(url);
};

const synthesis = (params) => {
  const url = "/day-keepings/synthesis";
  return axiosClient.post(url, params);
};

const calculate = (params) => {
  const url = "/day-keepings/calculate";
  return axiosClient.get(url, { params });
};

const uploadData = (data) => {
  const url = "/day-keepings/upload";
  console.log(data);
  return axiosClient.post(url, data);
};

export default {
  get,
  create,
  update,
  remove,
  synthesis,
  uploadData,
  calculate,
};
