import React from "react";

import Table from "../../../share/component/Table.component";

const Content = (props) => {
  const {
    fields,
    data,
    RowsSelected,
    setRowsSelected,
    CurrentPage,
    Loading,
    setCurrentPage,
    PerPage,
    totalDocuments,
    fetchData,
    scopedSlots,
  } = props;
  var dataRender = data;
  if (RowsSelected) {
    dataRender = data.map((item, index) => {
      if (item._id === RowsSelected._id) {
        return { ...item, _classes: "selected" };
      }
      return item;
    });
  }

  const handleSelectRow = (row) => {
    if (!RowsSelected) {
      return setRowsSelected(row);
    }
    if (RowsSelected._id !== row._id) {
      return setRowsSelected(row);
    }
    return setRowsSelected(null);
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
      onRowClick={handleSelectRow}
      scopedSlots={scopedSlots}
    />
  );
};
export default Content;
