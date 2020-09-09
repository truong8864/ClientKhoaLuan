import callAPI from "./callAPI";

const get = (body) => {
  return callAPI(`/stop-workings`, "GET", body);
};

const create = (body) => {
    return callAPI(`/stop-workings`, "POST", body);
  };


const update = (ID,body) => {
    return callAPI(`/stop-workings/${ID}`, "PUT",body);
};


const deleteX = (ID) => {
    return callAPI(`/stop-workings/${ID}`, "DELETE");
};


export default { get,update,deleteX,create };
