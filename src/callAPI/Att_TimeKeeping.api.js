import callAPI from "./callAPI";

const getDataTimeKeeping = (body = null) => {
  return callAPI(`/timekeeping-days`, "GET", body);
};

const importDataTimeKeeping = (body = null) => {
  return callAPI(`/timekeeping-days/import`, "POST", body);
};

const calculateTimeKeeping = (body = null) => {
  return callAPI(`/timekeeping-days/calculate`, "POST", body);
};


const create = (body) => {
  return callAPI(`/timekeeping-days`, "POST", body);
};

const update = (id,body) => {
  return callAPI(`/timekeeping-days/${id}`, "PUT", body);
};

const deleteX = (id) => {
  return callAPI(`/timekeeping-days/${id}`, "DELETE");
};

export default { getDataTimeKeeping, calculateTimeKeeping ,importDataTimeKeeping,create,update,deleteX};
