/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Expire_ContractApi } from '../../../../../callAPI/Hre_Contract.api';
//import { GetHre_Profie_Api } from '../../../../callAPI/Hre_Profile.api';
import { CInput } from '@coreui/react';


export default function GetStaff(props) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [Staff, setStaff]=useState([])
  useEffect(()=>{

    Expire_ContractApi().then(res=>{
      if(res.data)
      {
       setStaff(res.data)
      }
    })
  },[])
  const [name,setName]=useState([])
  const [code,setCode]=useState([])
  const{
    IdStaff,
    DateSignature
  }=props
  const up_name =(e)=>{
    setName(e)
  }
  const up_Code =(e)=>{
    setCode(e)
  }

  return (
    <TableRow hover>
      <TableCell>
      Họ và tên
          <Autocomplete
          multiple
          //id="checkboxes-tags-demo"
          options={code.length<=0?Staff:code}
          disableCloseOnSelect
          getOptionLabel={(option) => option.profiles[0].ProfileName}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option.profiles[0].ProfileName}
            </React.Fragment>
          )}
          onChange={(event,item)=>{up_name(item==null?"":item);IdStaff(item==null?"":item)}}
         // onChange={up_name}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" size="small" placeholder="Họ và tên nhân viên" />
          )}
        />
    </TableCell>
    <TableCell>
      Mã nhân viên
          <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={name.length<=0?Staff:name}
          disableCloseOnSelect
          getOptionLabel={(option) => option.profiles[0].CodeEmp}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option.profiles[0].CodeEmp}
            </React.Fragment>
          )}
          onChange={(event,item)=>{up_Code(item==null?"":item)}}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" size="small" placeholder="Mã nhân viên" />
          )}
        />
    </TableCell>
    <TableCell>
    Ngày kí hợp đồng
      <CInput onChange={(e)=>DateSignature(e.target.value)} type="date" ></CInput>
    </TableCell>
  </TableRow>
  );
}
