import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableRow from '@material-ui/core/TableRow';

import TableCell from '@material-ui/core/TableCell';
import { getOrgUnit } from '../../../../callAPI/OrgUnits.api';
export default function Company(props) {
  const [Unit, setUnit]=useState([])
  const [MaCongty, setMaCongty]= useState("")
  const [DIVISION, setDIVISION]= useState("")
  const [DEPARTMENT, setDEPARTMENT]= useState("")
  const [TEAM, setTEAM]= useState("")
  const {
    NhaMay,
    MaNhaMay,
    ChiNhanh,
    MaChiNhanh,
    PhongBan,
    MaPhongBan,
    BoPhan,MaBoPhan,
    To,MaTo
  }=props

  const up_CongTy = (e)=>{
    setMaCongty(e)
  }
  const up_DIVISION = (e)=>{
    setDIVISION(e)
  }
  const up_DEPARTMENT= (e)=>{
    setDEPARTMENT(e)
  }
  const up_TEAM= (e)=>{
    setTEAM(e)
  }
  useEffect(()=>{
    getOrgUnit(null).then(res=>{
      if(res.data)
      {
        setUnit(res.data)
      }
    })
  },[])

  let filterUNIT = Unit.filter(
    (contact)=>{
      return contact.E_UNIT_CODE.toLowerCase().indexOf(MaCongty.toLowerCase()) !== -1;
    }
    );

  let filterDIVISION = filterUNIT.filter(
    (contact)=>{
      return contact.E_DIVISION_CODE.toLowerCase().indexOf(DIVISION.toLowerCase()) !== -1;
    }
    );
  let filterDEPARTMENT = filterDIVISION.filter(
    (contact)=>{
      return contact.E_DEPARTMENT_CODE.toLowerCase().indexOf(DEPARTMENT.toLowerCase()) !== -1;
    }
    );
  let filterTEAM = filterDEPARTMENT.filter(
    (contact)=>{
      return contact.E_TEAM_CODE.toLowerCase().indexOf(TEAM.toLowerCase()) !== -1;
    }
    );
  return (

    <TableRow hover>
    <TableCell>
      Công ty/ Nhà máy
      <Autocomplete
      //id="combo-box-demo"
      options={Unit}
     // getOptionLabel={(option) => option.E_UNIT}
      getOptionLabel={(option) =>
        `${option.E_UNIT}-${option.E_UNIT_CODE}`
      }
      renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
      onChange={(event, item) => {up_CongTy(item==null?"":item.E_UNIT_CODE);
      NhaMay(item==null?"":item.E_UNIT);
      MaNhaMay(item==null?"":item.E_UNIT_CODE)
    }
    }
      />
    </TableCell>

    <TableCell>
             Chi nhánh
      <Autocomplete
     // id="combo-box-demo"
      options={filterUNIT}
      getOptionLabel={(option) => option.E_DIVISION}
      renderInput={(params) => <TextField {...params} size="small"  variant="outlined" />}
      onChange={(event, item) => {
      up_DIVISION(item==null?"":item.E_DIVISION_CODE);
      MaChiNhanh(item==null?"":item.E_DIVISION_CODE);
      ChiNhanh(item==null?"":item.E_DIVISION)
    }
      }
    />
    </TableCell>

    <TableCell>
     Phòng ban
      <Autocomplete
      //id="combo-box-demo"
      options={filterDIVISION}
      getOptionLabel={(option) => option.E_DEPARTMENT}
      renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
      onChange={(event, item) => {up_DEPARTMENT(item==null?"":item.E_DEPARTMENT_CODE);
      MaPhongBan(item==null?"":item.E_DEPARTMENT_CODE);
      PhongBan(item==null?"":item.E_DEPARTMENT)
    }}
    />
    </TableCell>
    <TableCell>Bộ phận
        <Autocomplete
        //id="combo-box-demo"
        options={filterDEPARTMENT}
        getOptionLabel={(option) => option.E_TEAM}
        renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
        onChange={(event, item) =>{up_TEAM(item==null?"":item.E_TEAM_CODE);
        MaBoPhan(item==null?"":item.E_TEAM_CODE);
        BoPhan(item==null?"":item.E_TEAM)
      }}
        />
    </TableCell>
    <TableCell>
    Tổ công tác
        <Autocomplete
        //id="combo-box-demo"
        options={filterTEAM}
        getOptionLabel={(option) => option.E_SECTION}
        renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
        onChange={(event, item) =>{
        MaTo(item==null?"":item.E_SECTION_CODE);
        To(item==null?"":item.E_SECTION)
      }}
        />
  </TableCell>
    </TableRow>

  );
}

