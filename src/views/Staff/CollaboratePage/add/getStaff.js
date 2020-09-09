/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//import { Notyet_ContractApi } from '../../../../callAPI/Hre_Contract.api';
import { CInput } from '@coreui/react';
import { SelectStaffCollaborateApi } from '../../../../callAPI/Hre_Collaborates.api';


export default function GetStaff(props) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [Staff, setStaff]=useState([])
  useEffect(()=>{
    SelectStaffCollaborateApi().then(res=>{
      if(res.data)
      {
        return setStaff(res.data)
      }
    })
  },[])
 // console.log("Staff",Staff)
  const [name,setName]=useState([])
  const [code,setCode]=useState([])
  const{
    IdStaff,
    DateSignature
  }=props
  const up_name =(e)=>{
    setName(e)
    console.log(name)
  }
  const up_Code =(e)=>{
    setCode(e)
  }
  /*let filter = Staff.filter(
    (contact)=>{
      if(contact.profiles)
      {
        return contact.profiles.ProfileName.toLowerCase().indexOf(name.trim().toLowerCase()) !== -1;
      }
      return 0;
    }
  );*/
  return (
    <TableRow hover>
      <TableCell>
      Họ và tên
          <Autocomplete
          multiple
          //id="checkboxes-tags-demo"
          options={code.length<=0?Staff:code}
          disableCloseOnSelect
          getOptionLabel={(option) => option.profiles?option.profiles.ProfileName:""}
          renderOption={(option, { selected }) => {
            if (option.profiles)
            {
            return (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option.profiles.ProfileName}
            </React.Fragment>)}
          }}
          onChange={(event,item)=>{up_name(item==null?"":item);IdStaff(item==null?"":item)
        }}
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
          getOptionLabel={(option) => option.profiles?option.profiles.ProfileName:""}
          renderOption={(option, { selected }) => {
            if(option.profiles)
            {
            return (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option.profiles.CodeEmp}
            </React.Fragment>)}
          }}
          onChange={(event,item)=>{up_Code(item==null?"":item)}}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" size="small" placeholder="Mã nhân viên" />
          )}
        />
    </TableCell>
    <TableCell>
    Ngày kí
      <CInput onChange={(e)=>DateSignature(new Date(e.target.value))} data-date-format="MMMM DD YYYY" type="date" ></CInput>
    </TableCell>
  </TableRow>
  );
}
