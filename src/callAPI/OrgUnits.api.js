import callAPI from "./callAPI";

const getOrgUnit = (body) => {
  return callAPI(`/org-units`, "GET", body);
};
const getOrgUnitByIdApi = (body) => {
  return callAPI(`/org-units/${body}`, "GET", null);
};

export  { getOrgUnit,getOrgUnitByIdApi };
