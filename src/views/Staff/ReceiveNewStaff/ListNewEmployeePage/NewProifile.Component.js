import React ,{useState}from "react"
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react"
import { Grid, TextField, FormControl, MenuItem ,makeStyles, Button} from "@material-ui/core"



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


const NewProfile=(props)=>{
  const classes = useStyles();

    const {showNewProfile, setshowNewProfile} =props
    const [NewProfile, setNewProfile] = useState({})
return <CModal
size="lg"
show={showNewProfile}
onClose={()=>setshowNewProfile(false)}
//onClosed={()=>setshowNewProfile(false)}
closeOnBackdrop={false}
>
<CModalHeader closeButton>Thêm nhân viên mới</CModalHeader>
<CModalBody>
<Grid className={classes.root} container spacing={1}>
<Grid className={classes.paper} container spacing={2}>
  <Grid item xs={3}>
    Mã nhân viên
    <TextField
      placeholder="Vui lòng nhập"
      value={!NewProfile.CodeEmp ? "" : NewProfile.CodeEmp}
      onChange={(event) => {
        if ("" !== event.target.value.trim())
          return setNewProfile({
            ...NewProfile,
            ...{ CodeEmp: event.target.value.trim() },
          });
        const { CodeEmp, ...NewProfileNew } = NewProfile;
        setNewProfile(NewProfileNew);
      }}
      variant="outlined"
      size="small"
      fullWidth
    />
  </Grid>
  <Grid item xs={3}>
    Tên nhân viên
    <TextField
      value={!NewProfile.ProfileName ? "" : NewProfile.ProfileName}
      onChange={(event) => {
        if ("" !== event.target.value.trim())
          return setNewProfile({
            ...NewProfile,
            ...{ ProfileName: event.target.value.trim() },
          });
        const { ProfileName, ...NewProfileNew } = NewProfile;
        setNewProfile(NewProfileNew);
      }}
      placeholder="Vui lòng nhập"
      variant="outlined"
      size="small"
      fullWidth
    />
  </Grid>
  <Grid item xs={3}>
    Số CMND
    <TextField
      value={!NewProfile.IDNo1 ? "" : NewProfile.IDNo1}
      onChange={(event) => {
        if ("" !== event.target.value.trim())
          return setNewProfile({
            ...NewProfile,
            ...{ IDNo1: event.target.value.trim() },
          });
        const { IDNo1, ...NewProfileNew } = NewProfile;
        setNewProfile(NewProfileNew);
      }}
      placeholder="Vui lòng nhập"
      variant="outlined"
      size="small"
      fullWidth
    />
  </Grid>
  <Grid item xs={3}>
  <FormControl fullWidth>
    Giới tính
    {
      <TextField
        select
        value={!NewProfile.Gender ? "" : NewProfile.Gender}
        onChange={(event) => {
          if ("" !== event.target.value.trim())
            return setNewProfile({
              ...NewProfile,
              ...{ Gender: event.target.value.trim() },
            });
          const { Gender, ...NewProfileNew } = NewProfile;
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
</Grid>
</Grid>
</CModalBody>
<CModalFooter>
<Button variant="contained" color="primary" style={{marginRight:"10px"}} >Lưu và đến trang cập nhật thông tin</Button>
  <Button variant="contained" color="primary" >Lưu và thoát</Button>
</CModalFooter>
</CModal>
}

export default NewProfile

const GenderValue = [
  {
    value: "",
    label: "None",
  },
  {
    value: "E_MALE",
    label: "Nam",
  },
  {
    value: "E_FEMALE",
    label: "Nữ",
  },
];
