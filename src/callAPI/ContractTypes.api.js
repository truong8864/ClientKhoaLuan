
import callAPI from "./callAPI";

const GetContractTypeApi = () =>
{
  return callAPI("/contract-types","GET",null)
}
export {GetContractTypeApi}
