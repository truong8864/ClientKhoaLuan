import React, { useState, useEffect }  from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import { TableHead, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getOrgUnitByIdApi } from '../../../../callAPI/OrgUnits.api';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const OrgStructureChild= (props)=>{
  const OrgStructureID = props.OrgStructureID;
  const [OrgStructure,setOrgStructure]= useState([])
 useEffect(()=>{
  if(OrgStructureID)
  {
    getOrgUnitByIdApi(OrgStructureID).then(res=>{
      if(res.data)
      {
        setOrgStructure([res.data])
      }
      else
      {
        
      }
  })
  }
 },[OrgStructureID])
console.log("render",OrgStructure)
  return(
    <Paper>
    <TableContainer>
    <Table>
      <TableHead>
      <TableRow><StyledTableCell colSpan={8}> <b>Vị trí làm việc</b></StyledTableCell></TableRow>
      </TableHead>
      {
        OrgStructure.length===0?"":OrgStructure.map((index)=> {return (
      <TableBody key={index.ID}>
        <TableRow hover>
          <TableCell align="right"><b>Bộ phận trực thuộc</b></TableCell>
          <TableCell>{index.E_DIVISION_CODE}/{index.E_DEPARTMENT_CODE}</TableCell>
          <TableCell align="right"><b>Mã chuỗi phòng ban</b></TableCell>
          <TableCell>{index.E_COMPANY_CODE+"/"+index.E_UNIT_CODE+"/"+index.E_DIVISION_CODE
          +"/"+index.E_DEPARTMENT_CODE+"/"+index.E_TEAM_CODE+"/"+index.E_SECTION_CODE}</TableCell>
          <TableCell align="right"><b>Chuỗi phòng ban</b></TableCell>
          <TableCell colSpan={3}>{index.E_COMPANY+"/"+index.E_UNIT+"/"+index.E_DIVISION
          +"/"+index.E_DEPARTMENT+"/"+index.E_TEAM+"/"+index.E_SECTION}</TableCell>
        </TableRow>
        <TableRow hover>
          <TableCell align="right"><b>Trực thuộc công ty</b></TableCell>
          <TableCell>{index.E_UNIT}</TableCell>
          <TableCell align="right"><b>Chi nhánh</b></TableCell>
          <TableCell>{index.E_DIVISION}</TableCell>
          <TableCell align="right"><b>Phòng ban</b></TableCell>
          <TableCell>{index.E_DEPARTMENT}</TableCell>

        </TableRow>
        <TableRow hover>
          <TableCell align="right"><b>Bộ phận</b></TableCell>
          <TableCell>{index.E_TEAM}</TableCell>
          <TableCell align="right"><b>Tổ làm việc</b></TableCell>
          <TableCell>{index.E_SECTION}</TableCell>
          <TableCell align="right"><b>Chức vụ</b></TableCell>
          <TableCell>{}</TableCell>
      </TableRow>
      </TableBody>
      )}
      )
    }
    </Table>
    </TableContainer>
    </Paper>
  )
}
export default OrgStructureChild
