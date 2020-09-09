import React, { useState }  from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { TableHead } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CInput } from '@coreui/react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton,Tooltip } from "@material-ui/core";
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import { UpDateProfileApi } from '../../../../callAPI/Hre_Profile.api';
import qs from 'qs'
import ProfileQualificationChild from './ProfileQualification';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const Infor= (props)=>{
  const data=props.data
  const IDQualification = props.IDQualification
  const [edit,setEdit]= useState(false)
  const [phone, setPhone] = useState("");
  const [address, setAddress]= useState("")


  const Up_Phone = (e)=>{
    setPhone(e.target.value);
  }
  const Up_Address = (e)=>{
    setAddress(e.target.value);
  }
  const On_edit = ()=>{
    setEdit(true)
  }
  const On_update = (item)=>{
    setEdit(false)
    console.log(data[0].ID)
    if(phone.trim()!=="" || address.trim()!=="")
    {
      if(phone.trim()==="")
      {
        return UpDateProfileApi(data[0].ID,qs.stringify({
          PAddress:address
         }))
      }
      if(address.trim()==="")
      {
        return UpDateProfileApi(data[0].ID,qs.stringify({
          Cellphone:phone,
         }))
      }
      return UpDateProfileApi(data[0].ID,qs.stringify({
      Cellphone:phone,
      PAddress:address
     }))
    }
  }
  return(
    <Paper >
      <TableContainer>
        <Table >
        <TableHead>
        <TableRow><StyledTableCell colSpan={8}> <b>Thông tin cơ bản</b></StyledTableCell></TableRow>

        </TableHead>
            {
              data.map((index)=> { return (
                <TableBody key={index.ID}>
                <TableRow hover role="checkbox" tabIndex={-1} >
                  <TableCell align="right"><b>Họ và tên</b></TableCell>
                  <TableCell>{index.ProfileName}</TableCell>
                  <TableCell align="right"><b>Số CMND</b></TableCell>
                  <TableCell >{index.CodeTax}</TableCell>
                  <TableCell align="right"><b>Nơi cấp CMND</b></TableCell>
                  <TableCell >{index.IDPlaceOfIssue}</TableCell>
                  <TableCell align="right"><b>Ngày cấp CMND</b></TableCell>
                  <TableCell >{index.IDDateOfIssue}</TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1} >
                  <TableCell align="right"><b>Giới tính</b></TableCell>
                  <TableCell>{index.Gender}</TableCell>
                  <TableCell align="right"><b>Mã nhân viên</b></TableCell>
                  <TableCell>{index.CodeEmp}</TableCell>
                  <TableCell align="right"><b>Mã chấm công</b></TableCell>
                  <TableCell >{index.CodeAttendance}</TableCell>
                  <TableCell align="right"><b>Trạng thái</b></TableCell>
                  <TableCell>{index.StatusSyn}</TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1} >
                  <TableCell align="right"><b>Ngày vào làm</b></TableCell>
                  <TableCell>{index.DateHire}</TableCell>
                  <TableCell align="right"><b>Ngày kết thúc thử việc</b></TableCell>
                  <TableCell>{index.DateEndProbation}</TableCell>
                  <TableCell align="right"><b>Ngày sinh</b></TableCell>
                  <TableCell >{index.DateOfBirth}</TableCell>
                  <TableCell align="right"><b>Nơi sinh</b></TableCell>
                  <TableCell>{index.PlaceOfBirth}</TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1} >
                  <TableCell align="right"><b>Số hộ chiếu</b></TableCell>
                  <TableCell>{index.PassportNo}</TableCell>
                  <TableCell align="right"><b>Ngày cấp hộ chiếu</b></TableCell>
                  <TableCell>{index.PassportDateOfIssue}</TableCell>
                  <TableCell align="right"><b>Ngày hết hạn</b></TableCell>
                  <TableCell >{index.PassportDateOfExpiry}</TableCell>
                  <TableCell align="right"><b>Nơi cấp</b></TableCell>
                  <TableCell>{index.PassportPlaceOfIssue}</TableCell>
              </TableRow>
              </TableBody>
              )})
            }
        </Table>
      </TableContainer>
      <TableContainer>
        <Table>
          <TableHead>
          <TableRow><StyledTableCell colSpan={8}> <b>Liên hệ</b></StyledTableCell></TableRow>

          </TableHead>
          {
          data.map((index)=> { return (
          <TableBody key={index.ID}>
          {edit===false?(
            <TableRow>
              <TableCell><Tooltip title="Sửa"><IconButton onClick={On_edit}><EditIcon/></IconButton></Tooltip></TableCell>
              <TableCell align="right"><b>Số điện thoại</b></TableCell>
              <TableCell colSpan='2'>{phone===''? index.Cellphone :phone   }</TableCell>
              <TableCell align="right"><b>Địa chỉ</b></TableCell>
              <TableCell colSpan='3'>{address ===''?index.PAddress:address}</TableCell>
            </TableRow>
          ):
          (
            <TableRow>
              <TableCell><Tooltip title="Cập nhật"><IconButton onClick={On_update}><SpellcheckIcon /></IconButton></Tooltip>
              </TableCell>
              <TableCell align="right"><b>Số điện thoại</b></TableCell>
              <TableCell colSpan='2'>
                <CInput type='tel' onChange={Up_Phone} placeholder={index.Cellphone}></CInput>
              </TableCell>
              <TableCell align="right"><b>Địa chỉ</b></TableCell>
              <TableCell colSpan='3'>
                <CInput type='text' onChange={Up_Address} placeholder={index.PAddress}></CInput>
              </TableCell>
            </TableRow>
          )
        }
          </TableBody>
          )}
          )
          }
        </Table>
      </TableContainer>
      <ProfileQualificationChild IDQualification={IDQualification}/>
    </Paper>
  )

}

export default Infor;
