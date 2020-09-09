import callAPI from "./callAPI";

const GetIdProfileQualificationApi= (body) =>
{
  return callAPI(`/profile-qualification/${body}`,"GET",null)
}
const CreateProfileQualificationApi= (body) =>
{
  return callAPI(`/profile-qualification`,"POST",body)
}
const UpDateProfileQualificationApi = (id,body)=>{
  return callAPI(`/profile-qualification/${id}`,"PUT",body)
}
export {GetIdProfileQualificationApi,CreateProfileQualificationApi,UpDateProfileQualificationApi}
