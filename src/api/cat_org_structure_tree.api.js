import axiosClient from "./axiosClient.api";

const get = (params) => {
  const url = "/org-structures-tree";
  return axiosClient.get(url, { params });
};

const getByRootID = (RootID = "2D51E4D9-0E27-451F-83D8-04DA7D6B9797") => {
  const url = `/org-structures-tree/${RootID}`;
  return axiosClient.get(url);
};

const getProfiles = (
  RootID = "2D51E4D9-0E27-451F-83D8-04DA7D6B9797",
  params
) => {
  const url = `/org-structures-tree/${RootID}/profiles`;
  return axiosClient.get(url, { params });
};

export default { get, getByRootID, getProfiles };
