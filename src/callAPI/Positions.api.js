import callAPI from "./callAPI";

export const GetPositionsApi = (body) =>{
  return callAPI(`/positions`, "GET", body);
}
