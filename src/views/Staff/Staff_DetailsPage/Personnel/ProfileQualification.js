import React, { useState, useEffect }  from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import { TableHead, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CInput,CForm, CRow, CCol } from '@coreui/react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton,Tooltip } from "@material-ui/core";
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import qs from 'qs'
import { GetIdProfileQualificationApi, CreateProfileQualificationApi,
  UpDateProfileQualificationApi} from '../../../../callAPI/Hre_ProfileQualification.api';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const ProfileQualificationChild= (props)=>{
  const IDQualification = props.IDQualification;
  const [edit,setEdit]= useState(false)
  const [name,setName]= useState("")
  const [place,setPlace]= useState("")
//console.log("IDQualification",IDQualification)
  const [Qualification,setQualification]= useState([])
 useEffect(()=>{
  GetIdProfileQualificationApi(`${IDQualification}`).then(res=>{
    setQualification(res.data)
  })
 },[IDQualification])
 const up_Name = (e)=>{
   setName(e.target.value)
   console.log(name)
 }
 const up_Place = (e)=>{
  setPlace(e.target.value)
  console.log(place)
}
 const On_edit = ()=>{
  setEdit(true)
}
const On_update = ()=>{
  setEdit(false)
  if(name.trim()!=="" || place.trim()!=="")
  {
    if(name.trim()==="")
    {
      return UpDateProfileQualificationApi(IDQualification,qs.stringify({
        TrainingPlace:place,
        DateUpdate:new Date()
       }))
    }
    if(place.trim()==="")
    {
      return UpDateProfileQualificationApi(IDQualification,qs.stringify({
        FieldOfTraining:name,
        DateUpdate:new Date()
       }))
    }
    return UpDateProfileQualificationApi(IDQualification,qs.stringify({
      FieldOfTraining:name,
      TrainingPlace:place,
      DateUpdate:new Date()
   }))
  }
}
const On_Create = ()=>{
  setEdit(false)
  if(name.trim()!=="" || place.trim()!=="")
  {
      return CreateProfileQualificationApi(qs.stringify({
        FieldOfTraining:name,
        TrainingPlace:place,
        ProfileID:IDQualification,
        DateCreate:new Date()//.toLocaleString('en-GB')
       }))
  }
}
  return(
    <Paper>
    {
      Qualification.length===0?(

        <CForm onSubmit={On_Create}>
        <CRow>
          <CCol xs='1'>
           <Tooltip title="Thêm"><IconButton type='submit' ><SpellcheckIcon/></IconButton></Tooltip>
          </CCol>
          <CCol xs="5">
            <b>Tên bằng cấp</b>
            <CInput onChange={up_Name} type='text' required ></CInput>
          </CCol>
          <CCol xs="6">
            <b>Nơi đào tạo</b>
            <CInput onChange={up_Place} type='text' required></CInput>
          </CCol>
          </CRow>
        </CForm>

        ):
    (
    <TableContainer>
    <Table>
      <TableHead>
      <TableRow><StyledTableCell colSpan={8}> <b>Trình độ chuyên môn</b></StyledTableCell></TableRow>
      </TableHead>
      {/*
        Qualification.length===0?
          (
            <CForm onSubmit={On_Create}>
           <TableBody>
            <TableRow>
              <TableCell><Tooltip title="Thêm"><IconButton type='submit' onClick={On_Create}><SpellcheckIcon/></IconButton></Tooltip>
              </TableCell>
              <TableCell align="right"><b>Tên bằng cấp</b></TableCell>
              <TableCell colSpan='2'>
                <CInput onChange={up_Name} type='text' ></CInput>
              </TableCell>
              <TableCell  align="right"><b>Nơi đào tạo</b></TableCell>
              <TableCell colSpan='3'>
                <CInput onChange={up_Place} type='text' ></CInput>
              </TableCell>
            </TableRow>
            </TableBody>
            </CForm>
          )
        :*/Qualification.map((index)=> { return (
      <TableBody key={index._id}>
      {edit===false?(
        <TableRow>
          <TableCell>
            <Tooltip title="Sửa"><IconButton onClick={On_edit}><EditIcon/></IconButton></Tooltip>
          </TableCell>
          <TableCell align="right"><b>Tên bằng cấp</b></TableCell>
          <TableCell colSpan='2'>{name===''?index.FieldOfTraining:name}</TableCell>
          <TableCell align="right"><b>Nơi đào tạo</b></TableCell>
          <TableCell colSpan='3'>{place===''?index.TrainingPlace:place}</TableCell>
        </TableRow>
      ):
      (
        <TableRow>
          <TableCell><Tooltip title="Cập nhật"><IconButton onClick={On_update}><SpellcheckIcon /></IconButton></Tooltip>
          </TableCell>
          <TableCell align="right"><b>Tên bằng cấp</b></TableCell>
          <TableCell colSpan='2'>
            <CInput  onChange={up_Name} type='text' placeholder={index.FieldOfTraining}></CInput>
          </TableCell>
          <TableCell align="right"><b>Nơi đào tạo</b></TableCell>
          <TableCell colSpan='3'>
            <CInput  onChange={up_Place} placeholder={index.TrainingPlace} type='text' ></CInput>
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
    )}

  </Paper>
  )
}
export default ProfileQualificationChild
