import callAPI from "./callAPI";

const getStructureTree = (body) => {
  return callAPI("/org-structures/trees", "GET", body);
};

const getListOrg = (OrgStructureID) => {
  return callAPI(
    `/org-structures/${!OrgStructureID ? "" : OrgStructureID}/trees/orgs`,
    "GET",
    {}
  );
};

const getListProfile = (OrgStructureID) => {
  return callAPI(
    `/org-structures/${!OrgStructureID ? "" : OrgStructureID}/trees/profiles`,
    "GET",
    {}
  );
};

const getListOrgStructure = (OrgStructureID) => {
  return callAPI(
    `/org-structures`,
    "GET",
    {}
  );
};

export default { getListProfile, getStructureTree, getListOrg ,getListOrgStructure};
