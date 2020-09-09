import React from "react";

import { useHistory } from "react-router-dom";

import { Toolbar, Tooltip, IconButton,makeStyles, Chip, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';

import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import SearchIcon from "@material-ui/icons/Search";
import SaveAltIcon from '@material-ui/icons/SaveAlt';


const useStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: "4px",
      paddingRight:"4px",
    },
    left: {
        flexGrow: 1,
        display:"flex"
    },
    search:{
        marginRight:theme.spacing(3)
    },
    right: {
     display:"flex"
    },
    setting:{
        marginLeft:theme.spacing(5)
    },
    button: {
      margin: theme.spacing(0)
    },
  }));


const ToolBar = (props) => {

    const classes = useStyles();

  const history = useHistory();

  const {  onSearch ,RowSelected ,setshowNewProfile } = props;

  const goDetail = () => {
    history.push(`/nhan-su/chi-tiet-nhan-vien/${RowSelected.profiles[0].ID}`);
  };
 // console.log(RowSelected.profiles)
  return (

      <Toolbar variant="dense" disableGutters className={classes.root} >
      <div className={classes.left}>
         <Chip
            icon={<SearchIcon />}
            label="Tìm kiếm"
            clickable
            className={classes.search}
            onClick={onSearch}
            color="primary"
            />
            <Typography variant="h6" component="h2">
            Nhân viên : {RowSelected.profiles?RowSelected.profiles[0].ProfileName:null}
            </Typography>

    </div>


     <div className={classes.right}>

    <div>


    <Button onClick={()=>setshowNewProfile(true)}
    color="primary"
    >
      <Tooltip title="Gia hạn">
        <NoteAddIcon />
        </Tooltip>Gia hạn
    </Button>

     <IconButton disabled={JSON.stringify(RowSelected)===JSON.stringify({})?true:false}   onClick={goDetail}>
      <Tooltip   title="Xem chi tiết hồ sơ">
       <FindInPageIcon />
       </Tooltip>
     </IconButton>

     <IconButton disabled={JSON.stringify(RowSelected)===JSON.stringify({})?true:false}>
     <Tooltip title="Cập nhật thông tin">
       <CreateIcon />
       </Tooltip>
     </IconButton>


       <IconButton disabled={JSON.stringify(RowSelected)===JSON.stringify({})?true:false}>
       <Tooltip title="Xóa hồ sơ">
         <DeleteOutlineIcon />
         </Tooltip>
       </IconButton>

     </div>
     <div
     className={classes.setting}
     >

        <IconButton>
        <Tooltip title="Export">
          <SaveAltIcon />
          </Tooltip>
        </IconButton>

        <IconButton>
        <Tooltip title="Cài đặt hiển thị">
          <SettingsIcon />
          </Tooltip>
        </IconButton>

      </div>
      </div>

      </Toolbar>

  );
};
export default ToolBar;
