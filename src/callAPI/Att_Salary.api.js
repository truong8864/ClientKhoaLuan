import callAPI from "./callAPI";

const get = (body = null) => {
  return callAPI(`/salarys`, "GET", body);
};


const payroll = (body = null) => {
    return callAPI(`/salarys/payroll`, "POST", body);
  };

  const update = (id,body = null) => {
    return callAPI(`/salarys/${id}`, "PUT", body);
  };

  const deleteX = (id) => {
    return callAPI(`/salarys/${id}`, "DELETE");
  };

export default { get,payroll,update ,deleteX};
