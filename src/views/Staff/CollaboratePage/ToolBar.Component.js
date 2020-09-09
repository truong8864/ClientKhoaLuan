import React from "react";

import { useHistory } from "react-router-dom";
import { Toolbar, Tooltip, IconButton,makeStyles, Chip, Typography,Button } from "@material-ui/core";
import UpdateIcon from '@material-ui/icons/Update';
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import SearchIcon from "@material-ui/icons/Search";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import { DeleteHreCollaboratesApi, UpdaHreCollaboratesApi } from "../../../callAPI/Hre_Collaborates.api";
import { CForm } from "@coreui/react";
import {  CSVLink } from "react-csv";
import qs from 'qs'
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
  const history = useHistory();

  const {  onSearch ,RowSelected ,
    setshowNewProfile,Export,HeaderExport,
    setShowUpdate,setShowAdd
  } = props;

  const goDetail = () => {
      history.push(`/nhan-su/chi-tiet-nhan-vien/${RowSelected.ProfileID}`);
  };

  const goDelete = () => {
   DeleteHreCollaboratesApi(RowSelected._id).then(res=>{
     if(res.data)
     {
       return alert("Xóa thành công!!!")
     }
     return alert("Xóa không thành công")
   })
  };

  const GoAccept = ()=>{
    UpdaHreCollaboratesApi(RowSelected._id,qs.stringify({Accept:"Đã duyệt"}))
  }
  const GoUnAccept = ()=>{
    UpdaHreCollaboratesApi(RowSelected._id,qs.stringify({Accept:"Chưa duyệt"}))
  }

  return (
    <CForm onSubmit={onSearch}>
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
    {RowSelected.Accept==='Chưa duyệt'?(
      <Button onClick={GoAccept} type='submit' disabled={RowSelected.Accept==='Chưa duyệt'?false:true}
      color="primary"
      >
        <Tooltip title="Duyệt">
          <PlaylistAddCheckOutlinedIcon />
          </Tooltip>Duyệt
      </Button>):
      (
        <Button onClick={GoUnAccept} type='submit' disabled={RowSelected.Accept!=='Chưa duyệt'?false:true}
        color="primary"
        >
        <Tooltip title="Hủy duyệt">
          <PlaylistAddCheckOutlinedIcon />
          </Tooltip>Hủy duyệt
      </Button>
      )
    }


    <IconButton  onClick={()=>setshowNewProfile(true)} disabled={RowSelected.Status==='Chuẩn bị công tác'?true:false}>
    <Tooltip title="Xét thưởng/ kỉ luật">
      <CreateIcon />
      </Tooltip>
    </IconButton>

    <IconButton onClick={()=>{setShowAdd(true)}} >
    <Tooltip title="Thêm hồ sơ điều động công tác">
      <NoteAddIcon />
      </Tooltip>
    </IconButton>

    <IconButton onClick={()=>setShowUpdate(true)} disabled={RowSelected.Status==='Chuẩn bị công tác'?false:true}>
      <Tooltip title="Thay đổi hồ sơ">
        <UpdateIcon />
      </Tooltip>
    </IconButton>

     <IconButton  disabled={JSON.stringify(RowSelected)===JSON.stringify({})?true:false}   onClick={goDetail}>
      <Tooltip   title="Xem chi tiết nhân viên">
       <FindInPageIcon />
       </Tooltip>
     </IconButton>
       <IconButton type='reset' onClick={goDelete} disabled={JSON.stringify(RowSelected)===JSON.stringify({})?true:false}>
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
          <CSVLink
          headers={HeaderExport}
          data={Export}
          filename={"qua-trinh-cong-tac.csv"}
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
      </CForm>

  );
};
export default ToolBar;
