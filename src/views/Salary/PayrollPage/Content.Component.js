import React from "react";

import Table from "../../../share/component/Table.component";
import { getDays } from "../../Staff/utils/table.utils";

const Content = (props) => {
  const {
    fields,
    data,
    CurrentPage,
    Loading,
    setCurrentPage,
    PerPage,
    totalDocuments,
    fetchData,
  } = props;

  const onPageChange = (page) => {
    fetchData(page);
    setCurrentPage(page);
  };

  return (
    <Table
      fields={fields}
      items={data}
      currentPage={CurrentPage}
      onPageChange={(i) => onPageChange(i)}
      isLoading={Loading}
      perPage={PerPage}
      totalDocuments={totalDocuments}
      scopedSlots={{
        TotalKeepingReality: (item) => {
          return <td>{`${getDays(item.TotalKeepingReality)} ngày `}</td>;
        },
        SalaryContract: (item) => {
          return <td>{`${item.SalaryContract} VNĐ `}</td>;
        },
        Salary: (item) => {
          return <td>{`${item.Salary} VNĐ `}</td>;
        },
      }}
    />
  );
};
export default Content;
