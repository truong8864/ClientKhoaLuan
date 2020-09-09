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
import  Company  from './getCompany';
import {  UpdaHreCollaboratesApi } from '../../../../callAPI/Hre_Collaborates.api';
import {useHistory} from 'react-router-dom'

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


export default function UpdateCollaboratePage(props) {
  //const paramater = match.params.ProfileID;
  const {RowSelected}=props;
  const [data, setdata]=useState({})
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [NamePosition, setNamePosition] = useState("")
  // const [StartDay, SetStartDay] = useState(new Date());
  // const [EndDay, SetEndDay] = useState(new Date());
   const [Time, setTime] = useState(null)
  // const [NhaMay,setNhaMay]= useState("")
  // const [MaNhaMay,setMaNhaMay]= useState("")
  // const [ChiNhanh, setChiNhanh]=useState("")
  // const [MaChiNhanh, setMaChiNhanh]=useState("")
  // const [PhongBan,setPhongBan]=useState("");
  // const [MaPhongBan,setMaPhongBan]=useState("")
  // const [BoPhan,setBoPhan]=useState("")
  // const [MaBoPhan,setMaBoPhan]=useState("")
  // const [To,setTo]=useState("")
  // const [MaTo,setMaTo]=useState("")
  const history = useHistory();

  // const Up_StartDay = (e)=>{
  //   SetStartDay(new Date(e.target.value))//.toLocaleString('en-GB'))
  //   SetEndDay(new Date(e.target.value))
  // }
  const upload = ()=>{
    setOpen(false);
   // EndDay.setMonth(EndDay.getMonth()+Time)
    UpdaHreCollaboratesApi(RowSelected._id,qs.stringify(data
      // {
      //     Accept:"Chưa duyệt",
      //     DateCreate:new Date(),
      //     DateSignature:new Date (),//.toLocaleString('en-GB'),
      //     DateStart: StartDay,
      //     DateEnd:new Date(EndDay),//.toLocaleString('en-GB'),
      //     Time:Time,
      //     PositionName:NamePosition,
      //     E_UNIT:NhaMay,//công ty
      //     E_UNIT_CODE: MaNhaMay,
      //     E_DIVISION: ChiNhanh,// chi nhánh
      //     E_DIVISION_CODE: MaChiNhanh,
      //     E_DEPARTMENT: PhongBan,// phòng ban
      //     E_DEPARTMENT_CODE: MaPhongBan,
      //     E_TEAM:BoPhan,//bộ phận
      //     E_TEAM_CODE:MaBoPhan,
      //     E_SECTION: To,//Tổ công tác
      //     E_SECTION_CODE:MaTo
      //   }
        )).then(res=>{
          if(res.data)
          {
            alert("Cập nhật thành công")
            return history.push(`/nhan-su/qua-trinh-cong-tac/dieu-dong-bo-nhiem`)
          }
          return alert("Cập nhật không thành công")
        })
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
          <TableRow hover role="checkbox" tabIndex={-1} >
            <TableCell>
              Chức vụ
              <PositionName  setdata={setdata} data={data} //NamePosition ={setNamePosition}
              />
              </TableCell>
              <TableCell colSpan='2'>
              <FormControl fullWidth>
              Thời gian công tác (tháng)
              { //onChange={Up_StartDay}
                <TextField
                  select
                  value={Time==null?"":Time}
                  onChange={(event)=>{
                    setTime(event.target.value);

                    if ("" !== event.target.value)
                  return setdata({
                    ...data,
                    ...{ Time: event.target.value },
                  });
                  const { Time, ...dataNew } = data;
                  setdata(dataNew);
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
            <TableCell colSpan='2'>
            Ngày đi công tác
            <CInput  onChange={(event) => {//Up_StartDay(event);
              if ("" !== event.target.value)
                return setdata({
                  ...data,
                  ...{ DateStart: new Date (event.target.value )},
                  ...{ DateEnd: (new Date(event.target.value)).setMonth() },
                });
              const { DateStart,DateEnd, ...dataNew } = data;
              setdata(dataNew);
            }} type="date" data-date-format="MMMM DD YYYY"></CInput>
            </TableCell>

          </TableRow>
           <Company //NhaMay={setNhaMay} MaNhaMay={setMaNhaMay}
          // ChiNhanh={setChiNhanh} MaChiNhanh={setMaChiNhanh}
          // PhongBan={setPhongBan} MaPhongBan={setMaPhongBan}
          // BoPhan={setBoPhan} MaBoPhan={setMaBoPhan}
          // To={setTo} MaTo={setMaTo}
          setdata={setdata} data={data}
          />
        </TableBody>
        </Table>
      </TableContainer>
      <Button  onClick={handleClickOpen} variant="contained" color="primary"> Lưu</Button>

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
