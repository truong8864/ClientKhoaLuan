import callAPI from "./callAPI";

export const  CreateApi=(body)=>{
  return callAPI('/create-pdf','POST',body)
}

export const  fetch=(body)=>{
  return callAPI('/fetch-pdf','GET',body)
}
