import callAPI from "./callAPI";

const getDataTimeKeepingGroup = (body = null) => {
  return callAPI(`/timekeeping-groups`, "GET", body);
};


const calculateTimeKeepingGroup = (body = null) => {
    return callAPI(`/timekeeping-groups/synthesis`, "POST", body);
  };

  const update = (id,body = null) => {
    return callAPI(`/timekeeping-groups/${id}`, "PUT", body);
  };

  const deleteX = (id) => {
    return callAPI(`/timekeeping-groups/${id}`, "DELETE");
  };

export default { getDataTimeKeepingGroup,calculateTimeKeepingGroup,update ,deleteX};
