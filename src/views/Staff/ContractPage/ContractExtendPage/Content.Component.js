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
  const { fields, data ,RowsSelected,setRowsSelected,noItem} = props;
  const classes = useStyles();

  const dataRender=data.map((item,index)=>{
    for (let index = 0; index < RowsSelected.length; index++) {
      const element = RowsSelected[index];
      if(item._id===element._id)
        return {...item,_classes:"selected"} 
    }
    return item
  })


  const handleSelectRow=(row)=>{
    for (let index = 0; index < RowsSelected.length; index++) {
      const element = RowsSelected[index];
      if(element._id===row._id)
      return setRowsSelected([...RowsSelected.slice(0,index),...RowsSelected.slice(index+1,RowsSelected.length)])
    }
    setRowsSelected([row,...RowsSelected])
  }

  return (
    
    <div className={classes.root}>
    <div className={classes.jss1}>
      <CDataTable
      addTableClasses={classes.table}
      fields={fields}
      items={dataRender}
      pagination={data.length > 20 ? true : false}
      itemsPerPage={20}
      border
      hover
      striped
      size="sm"
      noItemsViewSlot={noItem}
      onRowClick={handleSelectRow}
      />
      </div>
    </div>
  );
};
export default Content;
