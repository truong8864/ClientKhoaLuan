import React from "react";

import Table from "../../../../share/component/Table.component";

const Content = (props) => {
  const {
    data,
    fields,
    CurrentPage,
    RowSelected,
    setRowSelected,
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
    if (RowSelected && row.CodeEmp === RowSelected.CodeEmp) {
      return setRowSelected({});
    }
    setRowSelected(row);
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
      onRowClick={onSelectRow}
      scopedSlots={scopedSlots}
    />
  );
};
export default Content;
