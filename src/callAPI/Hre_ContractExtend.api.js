import callAPI from "./callAPI";

const get = (body = null) => {
  return callAPI(`/hre-contract-extend`, "GET", body);
};

const create = (body = null) => {
    return callAPI(`/hre-contract-extend`, "POST", body);
};

const update = (id,body = null) => {
    return callAPI(`/hre-contract-extend/${id}`, "PUT", body);
};

  const deleteX = (id) => {
    return callAPI(`/hre-contract-extend/${id}`, "DELETE");
  };

export default { get,create,update ,deleteX};
