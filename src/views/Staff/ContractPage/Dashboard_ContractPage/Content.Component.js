import React from "react";

import Table from "../../../../share/component/Table.component";

import { getDate } from "../../utils/table.utils";

const getBadge = (Gender) => {
  switch (Gender) {
    case "E_FEMALE":
      return "Nữ";
    default:
      return "Nam";
  }
};

const Content = (props) => {
  const {
    data,
    fields,
    RowSelected,
    setRowSelected,
    CurrentPage,
    Loading,
    setCurrentPage,
    PerPage,
    totalDocuments,
    fetchData,
    scopedSlots,
  } = props;
  const dataRender = data.map((item, index) => {
    if (item._id === RowSelected._id) return { ...item, _classes: "selected" };
    return item;
  });

  const onSelectRow = (row) => {
    // console.log("row",row,"RowSelected",RowSelected)
    if (row.profiles[0]) {
      // if(RowSelected&&row.profiles[0].CodeEmp){
      //return setRowSelected({})
      //}
      return setRowSelected(row);
    }
  };

  const onPageChange = (page) => {
    fetchData(page);
    setCurrentPage(page);
  };
  return (
    <Table
      fields={fields}
      items={dataRender}
      currentPage={CurrentPage}
      onPageChange={(i) => onPageChange(i)}
      isLoading={Loading}
      perPage={PerPage}
      totalDocuments={totalDocuments}
      onRowClick={(item) => onSelectRow(item)}
      scopedSlots={{
        ...scopedSlots,
        Gender: (item) => (
          <td>
            {getBadge(
              item.profiles.length === 0 ? "" : item.profiles[0].Gender
            )}
          </td>
        ),
        DateHire: (item) => <td>{getDate(item.profiles[0].DateHire)}</td>,
        ProfileName: (item) => (
          <td>
            {item.profiles.length === 0 ? "" : item.profiles[0].ProfileName}
          </td>
        ),
        CodeEmp: (item) => (
          <td>{item.profiles.length === 0 ? "" : item.profiles[0].CodeEmp}</td>
        ),
        DateSigned: (item) => <td>{getDate(item.DateSigned)}</td>,
        DateStart: (item) => <td>{getDate(item.DateStart)}</td>,
        DateEnd: (item) => <td>{getDate(item.DateEnd)}</td>,
      }}
    />
  );
};
export default Content;
