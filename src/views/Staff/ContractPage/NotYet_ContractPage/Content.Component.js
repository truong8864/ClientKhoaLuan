import React from "react";

import { CDataTable } from "@coreui/react";
import { makeStyles } from "@material-ui/core/styles";

const getBadge = Gender => {
  switch (Gender) {
    case 'E_FEMALE': return 'Nữ'
    default: return 'Nam'
  }
}
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

  const {data,fields,RowSelected,setRowSelected,noItem}=props
  const dataRender= data.map((item,index)=>{

    if(item._id===RowSelected._id)
        return {...item,_classes:"selected"}
     return item
  })

  const classes = useStyles();
  const onSelectRow=(row)=>{
    if(RowSelected&&row.CodeEmp===RowSelected.CodeEmp){
      return setRowSelected({})
    }
    setRowSelected(row)
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
        onRowClick={onSelectRow}
        noItemsViewSlot={noItem}
        scopedSlots = {{
          'Gender':
            (item)=>(
              <td>
                {getBadge(item.Gender)}
              </td>
            )
        }
      }
      />
      </div>
    </div>

  );
};
export default Content;
