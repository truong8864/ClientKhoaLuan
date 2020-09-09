import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CDataTable,CSidebarNav, CInput
} from '@coreui/react'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles  } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {csv} from 'd3'
import { CreateNewStaffApi } from '../../../../callAPI/Hre_Profile.api';
import { ProfileFields } from './fielsProfile';
import {  CSVLink } from "react-csv";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 400,
    },
    "& table": {
      "table-layout": "fixed",
    },

  },
  button: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(1),
    //textAlign: "center",
    height: "88vh",
    color: theme.palette.text.secondary,
  },

  sidebar: {
    padding: theme.spacing(1),
    //textAlign: "center",
    height: "100vh",
    color: theme.palette.text.secondary,
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReceiveNewStaffPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loadFiles,setLoadFiles]=useState(null);
  const up_files = (e)=>{
    let files=e.target.files;
    let reader = new FileReader();
    if(files.length>0)
    {
      reader.readAsDataURL(files[0])
      reader.onload=(e)=>{
      csv(e.target.result).then(data =>{
        setLoadFiles(data)
        })
      }
    }
  }
  const getBadge = Gender => {
    switch (Gender) {
      case 'E_FEMALE': return 'Nữ';
      default: return 'Nam'
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ReceiveStaff = ()=>{
    setOpen(false);
    if(loadFiles!==null)
    {
      CreateNewStaffApi(loadFiles)
      setLoadFiles(null)
      return;
    }
    alert("Hãy chọn file trước khi tiếp nhận nhân viên")
  }
  return  (
          <CCard >
            <CCardBody className={classes.paper} > <b>TIẾP NHẬN DANH SÁCH NHÂN VIÊN </b>
                <CInput className={classes.button} type='file' accept='.csv' onChange={up_files}></CInput>
                <CSVLink
                headers={ProfileFields}
                data={[]}
                filename={"new-Staff-List.csv"}
                className="btn btn-primary"
                target="_blank"
              >
              Tải file mẫu
              </CSVLink>
              <Button
              variant="contained"
              className={classes.button}
              onClick={handleClickOpen}
              startIcon={<CloudUploadIcon />}
            >
              Duyệt
            </Button>
          <CSidebarNav>
          {loadFiles===null?"Chọn danh sách cần tiếp nhận":(
            <CDataTable
              fields={ProfileFields}
              items={loadFiles}
              hover
              tableFilter
              size='sm'
              striped
              bordered
              itemsPerPage={10}
              pagination
              clickableRows
              scopedSlots = {{
                'Gender':
                  (item)=>(

                    <td>
                      {getBadge(item.Gender)}
                    </td>
                  )}}
            />
            )}
          </CSidebarNav>

            </CCardBody>
            <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Duyệt danh sách bạn vừa chọn?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Thông tin nhân viên sẽ được lưu vào hệ thống.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancle
              </Button>
              <Button onClick={ReceiveStaff} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          </CCard>
  )
}
export default ReceiveNewStaffPage
