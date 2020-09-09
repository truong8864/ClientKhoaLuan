import callAPI from "./callAPI";

const get = (body = null) => {
  return callAPI(`/leave-days`, "GET", body);
};

const create = (body) => {
  return callAPI(`/leave-days`, "POST", body);
};

const update = (id,body) => {
  return callAPI(`/leave-days/${id}`, "PUT", body);
};

const deleteX = (id) => {
  return callAPI(`/leave-days/${id}`, "DELETE");
};

export default { get,create,update,deleteX};
