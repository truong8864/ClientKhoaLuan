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
    scopedSlots,
    fetchData,
  } = props;

  const dataRender = data.map((item, index) => {
    if (item._id === RowSelected._id) return { ...item, _classes: "selected" };
    return item;
  });

  const onSelectRow = (row) => {
    if (RowSelected && row._id === RowSelected._id) {
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
      scopedSlots={scopedSlots}
      onRowClick={onSelectRow}
    />
  );
};
export default Content;

/**
 * AD new profile
 */
//   const input = ["listProfileNew"];

//   const process = {
//     1: `check BlackList'=> {
//     userBlackList
//     userPass = listProfileNew - userBlacklist
//     }
//     `,
//     2: "ADD userPass TO DATABASE",
//     3: "result data(userPass + BlackList)",
//   };

//   const dataResult = {
//     userPass: [],
//     userBlackList: [],
//   };
// };
