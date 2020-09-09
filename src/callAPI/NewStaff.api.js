import callAPI from "./callAPI";

export const GetNewStaffApi = (body) =>{
  return callAPI(`/new-staff`, "GET", body);
}
export const DeleteAllNewStaffApi = () =>{
  return callAPI(`/new-staff`, "PATCH", null);
}
export const CreateNewStaffApi = (body) => {
  return callAPI('/new-staff/create-files', "POST", body);
};
export const DeleteNewStaffApi = (body) =>{
  return callAPI(`/new-staff/${body}`, "PATCH", null);
}
