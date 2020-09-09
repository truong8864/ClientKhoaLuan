import React from "react";

import { Toolbar, Tooltip, IconButton,makeStyles, Chip, Typography } from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import SearchIcon from "@material-ui/icons/Search";
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { CSVLink } from "react-csv";



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
    }
  }));

const ToolBar = (props) => {

    const classes = useStyles();

  const {  onSearch ,
    RowSelected ,data,fields,
    setConfimDelete,
    setShowNewAndDetail,
   } = props;

  const New=()=>{
   setShowNewAndDetail({
      show:true,
      option:"new"
    })
  }

  const Detail = () => {
    setShowNewAndDetail({
      show:true,
      option:"update"
    })
  };



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
            Nhân viên : {RowSelected?RowSelected.ProfileName:null}
            </Typography>

    </div>


     <div className={classes.right}>

    <div>
    {
    <IconButton  onClick={New}>
    <Tooltip title="Thêm NV nghỉ việc">
      <NoteAddIcon />
      </Tooltip>
    </IconButton>
    }

<IconButton disabled={JSON.stringify(RowSelected)===JSON.stringify({})?true:false}   onClick={Detail}>
      <Tooltip  title="Xem chi tiết">
       <FindInPageIcon />
       </Tooltip>
     </IconButton>



  <IconButton onClick={()=>setConfimDelete(true)} disabled={JSON.stringify(RowSelected)===JSON.stringify({})?true:false}>
  <Tooltip title="Xóa">
   <DeleteOutlineIcon />
   </Tooltip>
 </IconButton>



     </div>
     <div
     className={classes.setting}
     >

     <IconButton>
     <Tooltip title="Export">
       <CSVLink
       headers={fields}
       data={data}
       filename={"danh-sach-nghi-viec.csv"}
     >
       <SaveAltIcon />
     </CSVLink>
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
