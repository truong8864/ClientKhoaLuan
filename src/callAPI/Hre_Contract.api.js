import callAPI from "./callAPI";

const GetContractApi = (body=null) =>
{
  return callAPI("/hre-contract","GET",body)
}
const Notyet_ContractApi = (body) =>
{
  return callAPI(`/hre-contract/not-yet-contract`,"GET",body)
}
const  ListContractApi = (body) =>
{
  return callAPI("/hre-contract/contract","GET",body)
}
const  Expire_ContractApi = (body) =>
{
  return callAPI("/hre-contract/expires","GET",body)
}
const GetHistoryContractApi = (body) =>
{
  return callAPI(`/hre-contract/history/${body}`,"GET",null)
}
const CreateContractApi = (body) =>
{
  return callAPI("/hre-contract","POST",body)
}
export {CreateContractApi,Notyet_ContractApi,Expire_ContractApi,GetContractApi,ListContractApi,GetHistoryContractApi}
