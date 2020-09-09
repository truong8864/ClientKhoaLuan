import React, { useState } from "react";

import { Grid, Paper, CircularProgress } from "@material-ui/core";

import Search from "./Search.Component";
import ToolBar from "./ToolBar.Component";
import NewProfile from "./NewProifile.Component"

import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content.Component";

//import { defaultProfileFields } from "../../utils/fieldsProfile";
import CIcon from "@coreui/icons-react";
import { cilBan } from "@coreui/icons";
import { Expire_ContractApi } from '../../../../callAPI/Hre_Contract.api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1)
  },
  search: {},
  toolbar: {},
  content: {},
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

const fields = [
  // { key: 'ContractNo',_style: { width: '300px'}, label: "Số hợp đồng" },
   { key: 'CodeEmp',_style: { width: '300px'}, label: "Mã nhân viên"  },
   { key: 'ProfileName',_style: { width: '300px'},label: "Họ & tên" },
   { key: 'Gender',_style: { width: '150px'},label: "Giới tính"  },
   { key: 'DateSigned',_style: { width: '300px'},label: "Ngày kí"  },
   { key: 'DateStart',_style: { width: '300px'},label: "Ngày có hiệu lực"  },
   { key: 'DateEnd',_style: { width: '300px'},label: "Ngày hết hạn"  },
 ]

const ExpireContractPage = (props) => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({});
  const [RowSelected, setRowSelected] = useState({});
  const [ListProfile, setListProfile] = useState([]);
  const [noItem, setnoItem] = useState(noItemView)

  const [showNewProfile, setshowNewProfile] = useState(false)

  const onSearch = async () => {
    try {
      setnoItem(Loading)
      setListProfile([])
      setRowSelected({})
      const res = await Expire_ContractApi(Filter);
      setListProfile(res.data);
      setnoItem(noItemView)
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
  };

  return (
    <Grid className={classes.root}>
    <Grid item><NewProfile setshowNewProfile={setshowNewProfile} showNewProfile={showNewProfile}/></Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.search}>

          <Search Filter={Filter} setFilter={setFilter} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.toolbar}>
          <ToolBar setshowNewProfile={setshowNewProfile} onSearch={onSearch} RowSelected={RowSelected} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.content}>
          <Content
            data={ListProfile}
            fields={fields}
            RowSelected={RowSelected}
            setRowSelected={setRowSelected}
            noItem={noItem}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ExpireContractPage;
