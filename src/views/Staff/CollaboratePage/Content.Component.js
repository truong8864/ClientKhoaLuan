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

  const {data,fields,RowSelected,setRowSelected,noItem}=props
  //const [Relatives,setRelatives]=useState("");


  const dataRender= data.map((item,index)=>{
    if(item._id===RowSelected._id)
        return {...item,_classes:"selected"}
     return item
  })
  // const on_status = (e)=>{
  //   setRelatives(e.target.value)
  //   console.log(Relatives)
  // }
  // const status = (item)=>{
  //   if(item.Relatives==='')
  //   {
  //     return (
  //       <CSelect onChange={on_status}>
  //         <option value="">Xét quá trình</option>
  //         <option value="DANG_CONG_TAC">Đang công tác</option>
  //         <option value="KHEN_THUONG">Khen thưởng</option>
  //         <option value="KI_LUAT">Kỉ luật</option>
  //       </CSelect>
  //     )
  //   }
  //   return item.Relatives
  // }

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
        clickableRows
        size="sm"
        onRowClick={onSelectRow}
        noItemsViewSlot={noItem}
        // scopedSlots = {{
        //   'Relatives':
        //     (item)=>(
        //       <td>
        //         {status(item)}
        //       </td>)
        // }}
      />
      </div>
    </div>

  );
};
export default Content;
