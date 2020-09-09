import React, { useState } from "react";

import { Grid, Paper, CircularProgress } from "@material-ui/core";

import Search from "./Search.Component";
import ToolBar from "./ToolBar.Component";
import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content.Component";

import { CongTac } from "../utils/fieldsProfile";
import CIcon from "@coreui/icons-react";
import { cilBan } from "@coreui/icons";
import { HreCollaboratesApi } from "../../../callAPI/Hre_Collaborates.api";
import StatusUptoDate from "./UpdateStatus";
import UpdateCollaborateDialog from "./UpdateCollaborate";
import AddCollaborateDialog from "./AddCollaborate";

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



const CollaboratePage = (props) => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({});
  const [RowSelected, setRowSelected] = useState({});
  const [ListProfile, setListProfile] = useState([]);
  const [noItem, setnoItem] = useState(noItemView)

  const [showNewProfile, setshowNewProfile] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showAdd, setShowAdd]= useState(false)
  const onSearch = async () => {
    try {
      setnoItem(Loading)
      setListProfile([])
      setRowSelected({})
      const res = await HreCollaboratesApi(Filter);
      setListProfile(res.data);
      setnoItem(noItemView)
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
  };

  return (
    <Grid className={classes.root}>
    <Grid item><StatusUptoDate setshowNewProfile={setshowNewProfile} showNewProfile={showNewProfile}/>
    <UpdateCollaborateDialog setShowUpdate={setShowUpdate} showUpdate={showUpdate} RowSelected={RowSelected}/>
    <AddCollaborateDialog showAdd= {showAdd} setShowAdd={setShowAdd} />
    </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.search}>

          <Search Filter={Filter} setFilter={setFilter} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.toolbar}>
          <ToolBar setshowNewProfile={setshowNewProfile} onSearch={onSearch}
              setShowUpdate={setShowUpdate}
              setShowAdd={setShowAdd}
              RowSelected={RowSelected} Export={ListProfile} HeaderExport={CongTac}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.content}>
          <Content
            data={ListProfile}
            fields={CongTac}
            RowSelected={RowSelected}
            setRowSelected={setRowSelected}
            noItem={noItem}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CollaboratePage;
