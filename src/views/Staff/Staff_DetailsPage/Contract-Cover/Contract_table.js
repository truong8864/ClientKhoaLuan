import React from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { TableHead } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CDataTable,CSidebarNav } from '@coreui/react';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const getBadge = Gender => {
  switch (Gender) {
    case 'E_FEMALE': return 'Nữ'
    default: return 'Nam'
  }
}
const fields = [
  // { key: 'ContractNo',_style: { width: '300px'}, label: "Số hợp đồng" },
   { key: 'CodeEmp',_style: { width: '300px'}, label: "Mã nhân viên"  },
   { key: 'ProfileName',_style: { width: '300px'},label: "Họ & tên" },
   { key: 'Gender',_style: { width: '150px'},label: "Giới tính"  },
   { key: 'DateSigned',_style: { width: '300px'},label: "Ngày kí"  },
   { key: 'DateStart',_style: { width: '300px'},label: "Ngày có hiệu lực"  },
   { key: 'DateEnd',_style: { width: '300px'},label: "Ngày hết hạn"  },
  ]
const ContractTable = (props)=>{
  const data = props.data;
  return (
  <Paper >
    <TableContainer>
      <Table >
      <TableHead>
      <TableRow><StyledTableCell colSpan={8}> <b>Thông tin hợp đồng</b></StyledTableCell></TableRow>
      </TableHead>
      </Table>
    </TableContainer>
    {
      data.length===0?(
        <h3 align = 'center'>Nhân viên này chưa có hợp đồng</h3>
      ):
    <CSidebarNav>
    <CDataTable
      items={data}
      fields={fields}
      hover
     // size='sm'
      striped
      bordered
      itemsPerPage={15}
      pagination
     // onRowClick={(item) => history.push(`/nhan-su/hop-dong/tao-moi-hop-dong/${item.CodeEmp}`)}
      scopedSlots = {{
        'Gender':
          (item)=>(
            <td>
              {getBadge(item.profiles[0].Gender)}
            </td>
          ),
          "DateHire":
          (item)=>( <td>
            {
              new Date(item.DateHire).toLocaleString('en-GB')
            }
          </td>),
          "ProfileName":
          (item)=>(
            <td>
              {item.profiles[0].ProfileName}
            </td>
          ),
          "CodeEmp":
          (item)=>(
            <td>
            {item.profiles[0].CodeEmp}
            </td>
          )
      }
    }
    />
  </CSidebarNav>
}
  </Paper>
  )
}
export default ContractTable
