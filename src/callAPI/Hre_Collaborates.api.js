import callAPI from "./callAPI";

export const HreCollaboratesApi =(body)=>{
  return callAPI(`/hre-collaborates`,"GET",body)
}
export const SelectStaffCollaborateApi =()=>{
  return callAPI(`/hre-collaborates/select-staff`,"GET",null)
}
export const BonusHreCollaboratesApi =()=>{
  return callAPI(`/hre-collaborates/bonus-disciplines`,"GET",null)
}
export const CreateHreCollaboratesApi =(body)=>{
  return callAPI(`/hre-collaborates`,"POST",body)
}
export const UpdaHreCollaboratesApi =(id,body)=>{
  return callAPI(`/hre-collaborates/${id}`,"PUT",body)
}
export const DeleteHreCollaboratesApi =(id)=>{
  return callAPI(`/hre-collaborates/${id}`,"PATCH",null)
}

/*
export const THreProfie_Api =(body)=>{
  return callAPI('/t-profiles',"GET",body)

}*/
