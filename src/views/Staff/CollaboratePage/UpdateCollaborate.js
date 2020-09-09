import React from "react"
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react"
import { Grid,makeStyles, Button} from "@material-ui/core"
import UpdateCollaboratePage from "./update";



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


const UpdateCollaborateDialog=(props)=>{
  const {showUpdate, setShowUpdate,RowSelected} =props
  const classes = useStyles();
return <CModal
size="lg"
show={showUpdate}
onClose={()=>setShowUpdate(false)}
//onClosed={()=>setshowNewProfile(false)}
closeOnBackdrop={false}
>
<CModalHeader closeButton><b>Chỉnh sửa thông tin công tác {RowSelected.ProfileName}</b></CModalHeader>
<CModalBody>
<Grid className={classes.root} container spacing={1}>
<Grid className={classes.paper} container spacing={2}>
  <UpdateCollaboratePage RowSelected={RowSelected}/>
</Grid>
</Grid>
</CModalBody>
<CModalFooter>
  <Button onClick={()=>{setShowUpdate(false)}} variant="contained" color="primary" >Thoát</Button>
</CModalFooter>
</CModal>
}

export default UpdateCollaborateDialog

