import React from "react";

import Table from "../../../../share/component/Table.component";

const getIsBlackList = (IsBlackList) => {
  switch (IsBlackList) {
    case 1:
      return "Nằm trong danh sách đen (Chú ý)";
    default:
      return "";
  }
};
const Content = (props) => {
  const {
    RowSelected,
    setRowSelected,
    CurrentPage,
    fields,
    data,
    Loading,
    setCurrentPage,
    PerPage,
    totalDocuments,
    fetchData,
    scopedSlots,
  } = props;

  const dataRender = data.map((item, index) => {
    for (let index = 0; index < RowSelected.length; index++) {
      const element = RowSelected[index];
      if (item._id === element._id) return { ...item, _classes: "selected" };
    }
    return item;
  });

  const onSelectRow = (row) => {
    for (let index = 0; index < RowSelected.length; index++) {
      const element = RowSelected[index];
      if (element._id === row._id) {
        return setRowSelected([
          ...RowSelected.slice(0, index),
          ...RowSelected.slice(index + 1, RowSelected.length),
        ]);
      }
    }
    setRowSelected([row, ...RowSelected]);
  };

  const onPageChange = (page) => {
    fetchData(page);
    setCurrentPage(page);
  };

  return (
    <Table
      currentPage={CurrentPage}
      onPageChange={(i) => onPageChange(i)}
      isLoading={Loading}
      perPage={PerPage}
      totalDocuments={totalDocuments}
      fields={fields}
      items={dataRender}
      scopedSlots={{
        ...scopedSlots,
        IsBlackList: (item) => <td>{getIsBlackList(item.IsBlackList)}</td>,
      }}
      onRowClick={onSelectRow}
    />
  );
};
export default Content;
