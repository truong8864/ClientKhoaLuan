import React ,{useState, useEffect}from "react"
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react"
import { Grid, TextField, FormControl, MenuItem ,makeStyles, Button} from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import qs from 'qs'

import { BonusHreCollaboratesApi,UpdaHreCollaboratesApi } from "../../../callAPI/Hre_Collaborates.api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    //padding: theme.spacing(1),
  },
  date: {
    width: theme.spacing(24),
    marginRight: theme.spacing(2),
  },
}));


const StatusUptoDate=(props)=>{
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const classes = useStyles();
  const {showNewProfile, setshowNewProfile} =props
  const [NewProfile, setNewProfile] = useState({Accept:"Chưa duyệt"})

  const [Staff,setStaff] = useState([])
  const [IdProfile,setIdProfile]=useState([])
  const [NameProfile,setNameProfile]=useState([])

  useEffect(()=>{
    BonusHreCollaboratesApi().then(res=>{
      if(res.data)
      {
       setStaff(res.data)
      }
    })
  },[])
  const Update = ()=>{
    console.log(IdProfile)
    let i=IdProfile.length
    while(i>0)
    {
      UpdaHreCollaboratesApi(IdProfile[i-1]._id,qs.stringify(NewProfile))
      i--
    }
  }
return <CModal
size="lg"
show={showNewProfile}
onClose={()=>setshowNewProfile(false)}
//onClosed={()=>setshowNewProfile(false)}
closeOnBackdrop={false}
>
<CModalHeader closeButton><b>Xét thưởng/ kỉ luật cho nhân viên</b></CModalHeader>
<CModalBody>
<Grid className={classes.root} container spacing={1}>
<Grid className={classes.paper} container spacing={2}>
  <Grid item xs={4}>
    Mã nhân viên
    <Autocomplete
    multiple
    //id="checkboxes-tags-demo"
    options={NameProfile.length===0?Staff:NameProfile}
    disableCloseOnSelect
    getOptionLabel={(option) => option.CodeEmp}
    renderOption={(option, { selected }) => (
      <React.Fragment>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          checked={selected}
        />
        {option.CodeEmp}
      </React.Fragment>)
    }
    onChange={(event,item)=>{setIdProfile(item==null?"":item)}}
    renderInput={(params) => (
      <TextField {...params} variant="outlined" size="small" placeholder="Mã nhân viên" />
    )}
  />
  </Grid>
  <Grid item xs={4}>
    Tên nhân viên
    <Autocomplete
    multiple
    //id="checkboxes-tags-demo"
    options={IdProfile.length===0?Staff:IdProfile}
    disableCloseOnSelect
    getOptionLabel={(option) => option.ProfileName}
    renderOption={(option, { selected }) => (
      <React.Fragment>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          checked={selected}
        />
        {option.ProfileName}
      </React.Fragment>)
    }
    onChange={(event,item)=>{setNameProfile(item==null?"":item)}}
    renderInput={(params) => (
      <TextField {...params} variant="outlined" size="small" placeholder="Họ và tên nhân viên" />
    )}
  />
  </Grid>
  <Grid item xs={4}>
  <FormControl fullWidth>
    Xét thưởng/ kỉ luật
    {
      <TextField
        select
        value={!NewProfile.Status ? "" : NewProfile.Status}
        onChange={(event) => {
          if ("" !== event.target.value.trim())
            return setNewProfile({
              ...NewProfile,
              ...{ Status: event.target.value.trim() },
            });
          const { Status, ...NewProfileNew } = NewProfile;
          setNewProfile(NewProfileNew);
        }}
        size="small"
        variant="outlined"
      >
        {GenderValue.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    }
  </FormControl>
</Grid>
    <Grid item xs={12}>
    Ghi chú
    <TextField
      value={!NewProfile.Reason ? "" : NewProfile.Reason}
      onChange={(event) => {
        if ("" !== event.target.value.trim())
          return setNewProfile({
            ...NewProfile,
            ...{ Reason: event.target.value },
          });
        const { Reason, ...NewProfileNew } = NewProfile;
        setNewProfile(NewProfileNew);
      }}
      placeholder="Vui lòng nhập"
      variant="outlined"
      fullWidth
      type='search'
    />
    </Grid>
</Grid>
</Grid>
</CModalBody>
<CModalFooter>
  <Button onClick={()=>{Update();setshowNewProfile(false)}} variant="contained" color="primary" >Lưu và thoát</Button>
</CModalFooter>
</CModal>
}

export default StatusUptoDate

const GenderValue = [
  {
    value: "",
    label: "None",
  },
  {
    value: "Khen thưởng",
    label: "Khen thưởng",
  },
  {
    value: "Kỉ luật",
    label: "Kỉ luật",
  },
];
