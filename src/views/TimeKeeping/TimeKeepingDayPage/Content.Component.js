import React from "react";

import Table from "../../../share/component/Table.component";

const Content = (props) => {
  const {
    CurrentPage,
    fields,
    data,
    RowsSelected,
    setRowsSelected,
    Loading,
    setCurrentPage,
    PerPage,
    totalDocuments,
    fetchData,
    scopedSlots,
  } = props;

  const onPageChange = (page) => {
    fetchData(page);
    setCurrentPage(page);
  };

  const dataRender = data.map((item, index) => {
    for (let index = 0; index < RowsSelected.length; index++) {
      const element = RowsSelected[index];
      if (item._id === element._id) return { ...item, _classes: "selected" };
    }
    return item;
  });

  const handleSelectRow = (row) => {
    for (let index = 0; index < RowsSelected.length; index++) {
      const element = RowsSelected[index];
      if (element._id === row._id)
        return setRowsSelected([
          ...RowsSelected.slice(0, index),
          ...RowsSelected.slice(index + 1, RowsSelected.length),
        ]);
    }
    setRowsSelected([row, ...RowsSelected]);
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
      scopedSlots={scopedSlots}
      onRowClick={handleSelectRow}
    />
  );
};
export default Content;
