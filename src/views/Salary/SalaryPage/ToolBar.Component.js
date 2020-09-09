import React from "react";

import { Toolbar, Tooltip, IconButton,makeStyles, Chip, Typography } from "@material-ui/core";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import SearchIcon from '@material-ui/icons/Search';


import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SettingsIcon from '@material-ui/icons/Settings';



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

  const { setConfimDelete, RowsSelected ,onSearch,show} = props;


  return (
   
      <Toolbar variant="dense" disableGutters className={classes.root} >
      <div className={classes.left}> 
      <Chip
      icon={<SearchIcon />}
      label="TÌM KIẾM"
      clickable
      className={classes.search} 
      onClick={onSearch}
      color="primary" 
      />
            <Typography variant="h6" component="h2" >
            {RowsSelected?`Kì công ${RowsSelected.KiCong} Nhân viên ${RowsSelected.ProfileName}`:null}
            </Typography>
    </div> 
      
     
     <div className={classes.right}> 
    

    <div>
     <IconButton disabled={RowsSelected?false:true} onClick={()=>show(true)}  >
      <Tooltip   title="Xem chi tiết">
       <FindInPageIcon />
       </Tooltip>
     </IconButton> 
       <IconButton onClick={()=>setConfimDelete(true)} disabled={RowsSelected?false:true} >
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
