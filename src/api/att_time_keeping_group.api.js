import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/time-keeping-groups";
  return axiosClient.get(url, { params });
};

const create = (data) => {
  const url = "/time-keeping-groups";
  return axiosClient.post(url, data);
};

const update = (ID, data) => {
  const url = `time-keeping-groups/${ID}`;
  return axiosClient.put(url, data);
};

const remove = (ID) => {
  const url = `time-keeping-groups/${ID}`;
  return axiosClient.delete(url);
};

const payroll = (params) => {
  const url = "/time-keeping-groups/payroll";
  return axiosClient.get(url, { params });
};

export default { get, create, update, remove, payroll };
