import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetPositionsApi } from '../../../../callAPI/Positions.api';

export default function PositionName(props) {
  const [Position, SetPosition]= useState([])
 const {
  //NamePosition,
  data, setdata
 }=props
  useEffect(()=>{
    GetPositionsApi().then(res=>{
      SetPosition(res.data)
    })
  },[])

  return (
    <div>
    <Autocomplete
      id="combo-box-demo"
      options={Position}
      getOptionLabel={(option) => option.PositionName}
      renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
      onChange={(event, item) => {//NamePosition(item==null?"":item.PositionName);
      if ( item !=null) {
        return setdata({
          ...data,
          ...{ PositionName:  item.PositionName }
        });
      }
      const { PositionName, ...datanew } = data;
      setdata(datanew);
    }
  }
    />
    </div>
  );
}