import React, { useState } from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import {
  MenuItem,
  FormControl,
  TextField,
} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
//import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import qs from 'qs'
import { CInput, CForm } from '@coreui/react';
import PositionName from './getPosition';
import GetStaff from './getStaff';
import  Company  from './getCompany';
import { CreateHreCollaboratesApi } from '../../../../callAPI/Hre_Collaborates.api';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: "50vh"
  },
  container: {
    maxHeight: 440,
  },
  background :{
    background: '#2979ff',
  }

});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function NewCollaboratePage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [NamePosition, setNamePosition] = useState("")
  const [IdProfile, SetIdProfile] = useState([])
  const [StartDay, SetStartDay] = useState(new Date());
  const [EndDay, SetEndDay] = useState(new Date());
  const [DateSignature,setDateSignature]=useState(new Date())
  const [Time, setTime] = useState(null)
  const [NhaMay,setNhaMay]= useState("")
  const [MaNhaMay,setMaNhaMay]= useState("")
  const [ChiNhanh, setChiNhanh]=useState("")
  const [MaChiNhanh, setMaChiNhanh]=useState("")
  const [PhongBan,setPhongBan]=useState("");
  const [MaPhongBan,setMaPhongBan]=useState("")
  const [BoPhan,setBoPhan]=useState("")
  const [MaBoPhan,setMaBoPhan]=useState("")
  const [To,setTo]=useState("")
  const [MaTo,setMaTo]=useState("")


  const Up_StartDay = (e)=>{
    SetStartDay(new Date(e.target.value))//.toLocaleString('en-GB'))
    SetEndDay(new Date(e.target.value))
  }
  const upload = ()=>{
    setOpen(false);
    EndDay.setMonth(EndDay.getMonth()+Time)
    let i=IdProfile.length;
    if(i!==0){
      alert("Thêm thành công")
      while(i!==0)
      {
        CreateHreCollaboratesApi(qs.stringify({
          ProfileID:IdProfile[i-1].profiles.ID,
          CodeEmp:IdProfile[i-1].profiles.CodeEmp,
          ProfileName:IdProfile[i-1].profiles.ProfileName,
         // Status:"Chuẩn bị công tác",
          DateCreate:new Date(),
          DateSignature:new Date (DateSignature),//.toLocaleString('en-GB'),
          DateStart: StartDay,
          DateEnd:new Date(EndDay),//.toLocaleString('en-GB'),
          Time:Time,
          PositionName:NamePosition,
          E_UNIT:NhaMay,//công ty
          E_UNIT_CODE: MaNhaMay,
          E_DIVISION: ChiNhanh,// chi nhánh
          E_DIVISION_CODE: MaChiNhanh,
          E_DEPARTMENT: PhongBan,// phòng ban
          E_DEPARTMENT_CODE: MaPhongBan,
          E_TEAM:BoPhan,//bộ phận
          E_TEAM_CODE:MaBoPhan,
          E_SECTION: To,//Tổ công tác
          E_SECTION_CODE:MaTo
        }))
        i--;
      }
      return;
    }
    return alert("Thêm không thành công")
  }

  //phụ cấp
  //Các khoản phụ cấp

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
        <TableBody>

          <GetStaff IdStaff={SetIdProfile} DateSignature={setDateSignature}/>
          <TableRow hover role="checkbox" tabIndex={-1} >
            <TableCell>
              Chức vụ
              <PositionName NamePosition ={setNamePosition}/>
              </TableCell>
              <TableCell>
              <FormControl fullWidth>
              Thời gian công tác (tháng)
              {
                <TextField
                  select
                  value={Time==null?"":Time}
                  onChange={(e)=>{
                    setTime(e.target.value)
                  }
                  }
                  size="small"
                  variant="outlined"
                >
                  {ValueTime.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              }
            </FormControl>
            </TableCell>
            <TableCell>
            Ngày đi công tác
            <CInput onChange={Up_StartDay} type="date" data-date-format="MMMM DD YYYY"></CInput>
            </TableCell>

          </TableRow>
          <Company NhaMay={setNhaMay} MaNhaMay={setMaNhaMay}
          ChiNhanh={setChiNhanh} MaChiNhanh={setMaChiNhanh}
          PhongBan={setPhongBan} MaPhongBan={setMaPhongBan}
          BoPhan={setBoPhan} MaBoPhan={setMaBoPhan}
          To={setTo} MaTo={setMaTo}
          />
        </TableBody>
        </Table>
      </TableContainer>
      <Button  onClick={handleClickOpen} variant="contained" color="primary"> Thêm</Button>

    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Điều động công tác cho nhân viên?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Thông tin nhân viên sẽ được lưu vào hệ thống.
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary">
            Cancle
          </Button>
        <CForm onSubmit={upload}>
            <Button type='submit' color="primary">
              Ok
            </Button>
        </CForm>
        </DialogActions>
      </Dialog>
  </Paper>

  );
}
const ValueTime = [
  {
    value: 3,
    label: "3"
  },
  {
    value: 6,
    label: "6"
  },
  {
    value: 12,
    label: "12"
  },
  {
    value: 24,
    label: "24"
  }
];
