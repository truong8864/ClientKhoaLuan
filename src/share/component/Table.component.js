import React from "react";

import { CDataTable, CPagination } from "@coreui/react";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "./Loading.component";
import NoItem from "./NoItem.component";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "grid",
    padding: "4px",
    borderRadius: "4px",
    backgroundColor: "#e8eaf5",
  },
  jss1: {
    overflow: "auto",
    maxWidth: "100%",
    backgroundColor: "#fff",
    borderRadius: "4px",
    height: "99vh",
  },
  table: {
    borderRadius: "4px",
    "& table": {
      "table-layout": "fixed",
    },
    "& thead": {
      color: "white",
      backgroundColor: "#4e658c",
    },
    "& tbody": {
      color: "#333f54",
      fontWeight: 600,
    },
    "& tbody>tr.selected": {
      backgroundColor: "#b5e2ff",
    },
  },
}));

const Table = (props) => {
  const classes = useStyles();
  const {
    isLoading = false,
    items = [],
    currentPage = 1,
    limitPage = 5,
    perPage = 1,
    onPageChange,
    scopedSlots,
    totalDocuments,
    fields,
  } = props;

  const BaseScopedSlots = {};

  for (let index = 0; index < fields.length; index++) {
    const element = fields[index].key;
    BaseScopedSlots[element] = (item) => {
      return <td>{!item[element] ? "" : item[element]}</td>;
    };
  }

  return (
    <div className={classes.root}>
      <div className={classes.jss1}>
        <CDataTable
          {...props}
          addTableClasses={classes.table}
          items={items}
          pagination={false}
          border
          striped
          hover
          scopedSlots={{ ...BaseScopedSlots, ...scopedSlots }}
          loading={isLoading}
          loadingSlot={<Loading />}
          size="sm"
          noItemsViewSlot={<NoItem />}
          underTableSlot={
            items.length <= 0 ? null : (
              <div className={"mt-2 ml-2"}>
                {items.length <= 0 ? null : (
                  <div className={"mt-2 mb-1 ml-2"}>
                    <b>{`${(currentPage - 1) * 25 + 1} đến ${
                      (currentPage - 1) * 25 + items.length
                    } trên ${totalDocuments}`}</b>
                  </div>
                )}
                <CPagination
                  activePage={currentPage}
                  pages={perPage}
                  onActivePageChange={onPageChange}
                  limit={limitPage}
                />
              </div>
            )
          }
        />
      </div>
    </div>
  );
};
export default Table;
