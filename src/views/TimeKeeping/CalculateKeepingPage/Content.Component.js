import React from "react";

import Table from "../../../share2/component/Table.component";

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
    scopedSlots,
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
      scopedSlots={scopedSlots}
    />
  );
};
export default Content;
