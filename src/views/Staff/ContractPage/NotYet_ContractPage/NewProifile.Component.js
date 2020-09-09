import React from "react"
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react"
import { Grid,makeStyles, Button} from "@material-ui/core"
import NewContractPage from "../NewContractPage";

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
return <CModal
size="lg"
show={showNewProfile}
onClose={()=>setshowNewProfile(false)}
//onClosed={()=>setshowNewProfile(false)}
closeOnBackdrop={false}
>
<CModalHeader closeButton>Kí hợp đồng cho nhân viên</CModalHeader>
<CModalBody>
<Grid className={classes.root} container spacing={1}>
<Grid className={classes.paper} container spacing={2}>

  <NewContractPage/>

</Grid>
</Grid>
</CModalBody>
<CModalFooter>
  <Button variant="contained" color="primary" onClick={()=>setshowNewProfile(false)} >Thoát</Button>
</CModalFooter>
</CModal>
}

export default NewProfile

