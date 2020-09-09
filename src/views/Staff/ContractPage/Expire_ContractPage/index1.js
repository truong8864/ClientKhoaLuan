import React, { useState, useEffect } from 'react'
import { Redirect} from "react-router-dom";//useHistory
import {
  CCard,
  CCardBody,
  CDataTable,CSidebarNav
} from '@coreui/react'
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles,createMuiTheme,ThemeProvider  } from '@material-ui/core/styles';
import {LinearProgress} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Expire_ContractApi } from '../../../../callAPI/Hre_Contract.api';

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

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
const fields = [
 // { key: 'ContractNo',_style: { width: '300px'}, label: "Số hợp đồng" },
  { key: 'CodeEmp',_style: { width: '300px'}, label: "Mã nhân viên"  },
  { key: 'ProfileName',_style: { width: '300px'},label: "Họ & tên" },
  { key: 'Gender',_style: { width: '150px'},label: "Giới tính"  },
  { key: 'DateSigned',_style: { width: '300px'},label: "Ngày kí"  },
  { key: 'DateStart',_style: { width: '300px'},label: "Ngày có hiệu lực"  },
  { key: 'DateEnd',_style: { width: '300px'},label: "Ngày hết hạn"  },
  //{ key: 'JobDescription',_style: { width: '1000px'},label: "Mô tả"  },


 /* {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }*/
]
const getBadge = Gender => {
  switch (Gender) {
    case 'E_FEMALE': return 'Nữ'
    default: return 'Nam'
  }
}

const ExpireContractPage = () => {
  const classes = useStyles();
  const [name,setName]=useState("");
  const [code,setCode]=useState("");
  const [staff,setStaff]=useState([]);
  const [load,setLoad]=useState(false);

  const [isRedirec,setIsRedirec]=useState(false);
  //const history = useHistory()

  useEffect(()=>{
    Expire_ContractApi().then(res=>{
      if(res.data )
      {
        setStaff(res.data)
        setLoad(true)
      }
    })
  },[])

  const up_Name = (e) =>{
    setName(e.target.value);
  }
  const up_CodeEmp = (e) =>{
    setCode(e.target.value);
  }

  let filter = staff.filter(
    (contact)=>{
      return contact.profiles[0].ProfileName.toLowerCase().indexOf(name.trim().toLowerCase()) !== -1;
    }
  );

let filter2 = filter.filter(
(contact)=>{
  return contact.profiles[0].CodeEmp.toLowerCase().indexOf(code.trim().toLowerCase()) !== -1;
}
);
  return  isRedirec?<Redirect to='/nhan-su/hop-dong/gia-han-hop-dong' />:(
          <CCard >
            <CCardBody className={classes.paper} > <b>DANH SÁCH HỢP ĐỒNG HẾT HẠN </b>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  label="Tên nhân viên"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  onChange={up_Name} type="search"
                />
                <TextField
                  label="Mã nhân viên"
                  id="outlined-size-normal"
                  variant="outlined"
                  size="small"
                  onChange={up_CodeEmp} type="search"
                />

                <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={()=>setIsRedirec(true)}
                  startIcon={<CloudUploadIcon />}
                >
                  Gia hạn
                </Button>
              </ThemeProvider>
            </form>
{ load===false?<LinearProgress />:(
          <CSidebarNav>
            <CDataTable
              items={filter2}
              fields={fields}
              hover
              size='sm'
              striped
              bordered
              itemsPerPage={15}
              pagination
             // onRowClick={(item) => history.push(`/nhan-su/hop-dong/tao-moi-hop-dong/${item.CodeEmp}`)}
              clickableRows
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
)}
            </CCardBody>
          </CCard>
  )
}
export default ExpireContractPage
