import React from "react";


import { Toolbar, Tooltip, IconButton,makeStyles } from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";

import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


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


  return (
   
      <Toolbar variant="dense" disableGutters className={classes.root} >
      <div className={classes.left}> 
            <Tooltip  className={classes.search}  title="Sửa">
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>    
          <Tooltip title="Lưu lại">
          <IconButton>
            <SaveIcon />
          </IconButton>
        </Tooltip>  
  
    </div> 
      
     
     <div className={classes.right}> 
     <div
     className={classes.setting}
     >
     <Tooltip title="Đến trang danh sách nhân viên">
        <IconButton>
          <ExitToAppIcon />
        </IconButton>
      </Tooltip>
      </div>
      </div>
       
      </Toolbar>
   
  );
};
export default ToolBar;
