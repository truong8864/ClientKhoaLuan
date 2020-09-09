import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableRow from '@material-ui/core/TableRow';

import TableCell from '@material-ui/core/TableCell';
import { GetContractTypeApi } from '../../../../../callAPI/ContractTypes.api';
export default function ContractType(props) {
  const [contract, setContract]=useState([])
  const [type, setType]= useState("")
  const [name, setName]= useState("")

  const {
    IDtypeContract
  }=props

  const up_Type = (e)=>{
    setType(e)
  }
  const up_Name = (e)=>{
    setName(e)
  }

  useEffect(()=>{
    GetContractTypeApi().then(res=>{
      if(res.data)
      {
        setContract(res.data)
      }
    })
  },[])

  let filterType = contract.filter(
    (contact)=>{
      return contact.ContractTypeName.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    }
    );

  let filterTerm = filterType.filter(
    (contact)=>{
      return contact.Type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
    }
    );
  return (
    <TableRow hover>
    <TableCell>
      Tên hợp đồng
      <Autocomplete
      //id="combo-box-demo"
      options={filterTerm}
      getOptionLabel={(option) => option.ContractTypeName}
      renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
      onChange={(event, item) => up_Name(item==null?"":item.ContractTypeName)}

      />
    </TableCell>

    <TableCell>
              Loại hợp đồng
              <Autocomplete
     // id="combo-box-demo"
      options={filterType}
      getOptionLabel={(option) => option.Type}
      renderInput={(params) => <TextField {...params} size="small"  variant="outlined" />}
      onChange={(event, item) => up_Type(item==null?"":item.Type)}
    />
    </TableCell>

    <TableCell>
      Thời hạn hợp đồng
      <Autocomplete
      //id="combo-box-demo"
      options={filterType}
      getOptionLabel={(option) => option.ValueTime}
      renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
      onChange={(event, item) => IDtypeContract(item==null?"":item.ID)}
    />
    </TableCell>
    </TableRow>
  );
}

