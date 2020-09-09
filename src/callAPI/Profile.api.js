import callAPI from "./callAPI";

const getProfiles = (body) => {
  return callAPI(`/profiles`, "GET", body);
};


const getProfilesbyCodeEmp = (CodeEmp) => {
  return callAPI(`/profiles`, "GET",{CodeEmp:CodeEmp});
};

export default { getProfiles,getProfilesbyCodeEmp };
