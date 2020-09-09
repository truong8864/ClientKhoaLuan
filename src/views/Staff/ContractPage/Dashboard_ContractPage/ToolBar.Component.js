import React,{useState} from "react";

import { useHistory } from "react-router-dom";

import { Toolbar,
  Tooltip,
  IconButton,
  makeStyles,
  Chip,
  Typography,
  MenuItem,Menu
 } from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import SearchIcon from "@material-ui/icons/Search";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
//xuất file
import { CSVLink } from "react-csv";
import { CreateApi } from '../../../../callAPI/ExportFile';
import * as config from '../../../../callAPI/config'
import qs from 'qs'
import { saveAs } from 'file-saver';
import axios from 'axios'
//import { exportContractToPDF } from "../../utils/exportToPDF";

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

  }));


const ToolBar = (props) => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const {  onSearch ,RowSelected ,setshowNewProfile,data, header } = props;

  const goDetail = () => {
    history.push(`/nhan-su/chi-tiet-nhan-vien/${RowSelected.profiles[0].ID}`);
  };

 const handleClickExport = (event) => {
  setAnchorEl(event.currentTarget);
  };
  const Infor = {
    ProfileName:RowSelected.profiles?RowSelected.profiles[0].ProfileName:"",
    Gender:RowSelected.profiles?RowSelected.profiles[0].Gender:"",
    DateOfBirth:RowSelected.profiles?RowSelected.profiles[0].DateOfBirth:"",
    PAStreet:RowSelected.profiles?RowSelected.profiles[0].PAddress:"",
    IDNo:RowSelected.profiles?RowSelected.profiles[0].IDNo:"",
    ContractNo:'2019/PPJ/HCNS',
    IDDateOfIssue:RowSelected.profiles?RowSelected.profiles[0].IDDateOfIssue:"",
    IDPlaceOfIssue:RowSelected.profiles?RowSelected.profiles[0].IDPlaceOfIssue:"",
    DateContract:RowSelected.DateSigned,
    CodeEmp:RowSelected.profiles?RowSelected.profiles[0].CodeEmp:"",
  }
  const handleCloseExport = () => {
    setAnchorEl(null);
     //xuất file
     CreateApi(qs.stringify(Infor))
     .then(()=> axios({url:`${config.REACT_URL_API}/fetch-pdf`,
     method:"GET", responseType: 'blob',
    withCredentials:true }))
     .then((res)=>{
       console.log("1")
       const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
       console.log("2")

       saveAs(pdfBlob, `HopDong${RowSelected.profiles?RowSelected.profiles[0].ProfileName:""}.pdf`);
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
            Nhân viên : {RowSelected.profiles?RowSelected.profiles[0].ProfileName:null}
            </Typography>

    </div>


     <div className={classes.right}>

    <div>
    <IconButton onClick={()=>setshowNewProfile(true)}>
    <Tooltip title="Thêm hợp đồng">
      <NoteAddIcon />
      </Tooltip>
    </IconButton>

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
     <div>
     <IconButton>
     <Tooltip title="Cài đặt hiển thị">
       <SettingsIcon />
       </Tooltip>
     </IconButton>

        <IconButton onClick={handleClickExport}>
        <Tooltip title="Export">
          <SaveAltIcon />
          </Tooltip>
        </IconButton>
        <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={ Boolean(anchorEl)}
        onClose={handleCloseExport}
       // TransitionComponent={Fade}
      >
        <MenuItem onClick={handleCloseExport}>
          <CSVLink
            data={data}
            headers={header}
            filename={"DsHopdong.csv"}
          >
          Danh sách hợp đồng
          </CSVLink>
        </MenuItem>
        <MenuItem onClick={handleCloseExport}>HopDong-{RowSelected.profiles?RowSelected.profiles[0].ProfileName:""}</MenuItem>
      </Menu>
      </div>

      </div>
      </div>

      </Toolbar>

  );
};
export default ToolBar;
