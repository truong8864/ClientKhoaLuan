import React from "react";

import { CDataTable } from "@coreui/react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "grid",
    padding: "4px",
    borderRadius: "4px",
    backgroundColor: "#e8eaf5",
  },
  jss1:{
    overflow: "auto",
    maxWidth:"100%",
    backgroundColor: "#fff",
    borderRadius: "4px",
    height:"80vh"
  },
  table:{
    borderRadius: "4px",
  }
}));

const Content = (props) => {

  const classes = useStyles();
  return (
    
    <div className={classes.root}>
    <div className={classes.jss1}>
      <CDataTable
        addTableClasses={classes.table}
        fields={["1","2","3","4"]}
        items={[{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},{"1":"213213"},]}
        //pagination={data.length > 15 ? true : false}
        pagination
        itemsPerPage={15}
        border
        hover
        striped
        size="sm"
        //onRowClick={handleClick}
      />
      </div>
    </div>
  
  );
};
export default Content;
