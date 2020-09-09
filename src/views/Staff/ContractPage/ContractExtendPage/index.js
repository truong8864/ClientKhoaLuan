import React, { useState } from "react";

import ContractExtendAPI from "../../../../callAPI/Hre_ContractExtend.api";

import { makeStyles } from "@material-ui/core/styles";

import { Grid, Paper, CircularProgress, Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import CIcon from "@coreui/icons-react";
import { cilBan } from "@coreui/icons";

import Search from "./Search.Component";
import ToolBar from "./ToolBar.Component";
import Content from "./Content.Component";
import NewAndDetail from "./NewAndDetail.Component";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //height: "100vh" ,
   // paddingLeft: theme.spacing(1)
  },
  search: {  },
  toolbar: {
   
    //marginBottom: "0px",
    marginTop: "4px",
  },
  content: { height: "75vh" },
}));

const noItemView=()=>{
  return (
    <div className="text-center my-5">
    <h2>
      { "Không có dữ liệu" }
      <CIcon
        width="30"
        name="cilBan"
        content={cilBan}
        className="text-danger mb-2"
      />
    </h2>
  </div>)
}

const Loading=()=>{
  return (
    <div className="text-center my-5">
    <h2>
      { "Đang tải dữ liệu" }
      <CircularProgress />
    </h2>
  </div>)
}
 
 


const ContractExtendPage = () => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({})

  const [RowsSelected, setRowsSelected] = useState([])

  const [ListDataTimeKeeping, setListDataTimeKeeping] = useState([]);

  const [noItem, setnoItem] = useState(noItemView)

  const [Option, setOption] = useState(null)

  const [ConfimDelete, setConfimDelete] = useState(false)

  const onSearch = async () => {
    setnoItem(Loading)
    setListDataTimeKeeping([])
    setRowsSelected([])
    const res = await ContractExtendAPI.get(Filter);
    setListDataTimeKeeping(res.data.data);
    setnoItem(noItemView)
  };


  const reload=async()=>{
    const res = await ContractExtendAPI.get(Filter);
    setListDataTimeKeeping(res.data.data);
  }

    const onDelete= async()=>{
      await ContractExtendAPI.deleteX(RowsSelected[0]._id)
      setRowsSelected([])
      setConfimDelete(false)
      reload()
    }
    
  




  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.search}>
        {!Option?null: <NewAndDetail document={"update"!==Option?null:RowsSelected[0]} option={Option} show={setOption} />}
          {
            <Search
            Filter={Filter}
            setFilter={setFilter}           
            />
          }
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.toolbar} variant="outlined">
          <ToolBar setConfimDelete={setConfimDelete} show={setOption} RowsSelected={RowsSelected} onSearch={onSearch} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.content}>     
            <Content noItem={noItem} fields={fields} RowsSelected={RowsSelected} setRowsSelected={setRowsSelected} data={ListDataTimeKeeping} />
        </Paper>
      </Grid>
      <Dialog
      open={ConfimDelete}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogTitle >Xác nhận xóa</DialogTitle>
       <DialogActions>
          <Button 
          onClick={()=>setConfimDelete(false)}
           color="primary">
            Không
          </Button>
          <Button
           onClick={onDelete} 
           color="primary" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ContractExtendPage;

const fields = [
  //{ _style: { width: "250px" }, key: "ProfileID", label: "ProfileID" },
  { _style: { width: "150px" }, key: "DateStart", label: "Ngày bắt đầu" },
  { _style: { width: "150px" }, key: "DateEnd", label: "Ngày kết thúc" },
  
  { _style: { width: "120px" }, key: "CodeEmp", label: "Mã nhân viên" },
  { _style: { width: "200px" }, key: "ProfileName", label: "Tên nhân viên" },
  {
    _style: { width: "300px" },
    key: "OrgStructureName",
    label: "Phòng ban",
  },
  {
    _style: { width: "150px" },
    key: "Status",
    label: "Trạng thái",
  },
  {
    _style: { width: "100px" },
    key: "salary",
    label: "Lương mới",
  },
  { _style: { width: "250px" }, key: "Description ", label: "Ghi chú" },
];
