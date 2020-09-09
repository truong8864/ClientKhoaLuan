import callAPI from "./callAPI";
/*
function THre_Profie_Api(body)
{
  return callAPI(`/t-profiles/${body}`,"GET",null)
}
function All_THreProfie_Api(body)
{
  return callAPI('/profiles',"GET",null)
}

export {THre_Profie_Api,All_THreProfie_Api}
/*
module.exports.GetHre_Profie_Api = function(body){
  return callAPI("/profiles","GET",body)
}
*/
export const THre_Profie_Api =(body)=>{
  return callAPI(`/t-profiles/${body}`,"GET",null)

}
export const THreProfie_Api =(body)=>{
  return callAPI('/t-profiles',"GET",body)

}
