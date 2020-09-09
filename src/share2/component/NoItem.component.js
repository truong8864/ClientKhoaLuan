import React from "react";

import CIcon from "@coreui/icons-react";
import { cilBan } from "@coreui/icons";

const NoItem = () => {
  return (
    <div className="text-center my-5">
      <h2>
        {"Không có dữ liệu"}
        <CIcon
          width="30"
          name="cilBan"
          content={cilBan}
          className="text-danger mb-2"
        />
      </h2>
    </div>
  );
};

export default NoItem;
