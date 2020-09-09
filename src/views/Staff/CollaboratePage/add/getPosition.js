import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetPositionsApi } from '../../../../callAPI/Positions.api';

export default function PositionName(props) {
  const [Position, SetPosition]= useState([])
 const {
  NamePosition
 }=props
  useEffect(()=>{
    GetPositionsApi().then(res=>{
      SetPosition(res.data)
    })
  },[])
  //console.log("abc",Position)
  return (
    <div>
    <Autocomplete
      id="combo-box-demo"
      options={Position}
      getOptionLabel={(option) => option.PositionName}
      renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
      onChange={(event, item) => NamePosition(item==null?"":item.PositionName)}
    />
    </div>
  );
}
