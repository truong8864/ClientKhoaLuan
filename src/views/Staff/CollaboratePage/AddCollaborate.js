import React from "react"
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react"
import { Grid,makeStyles, Button} from "@material-ui/core"
import NewCollaboratePage from "./add";



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


const AddCollaborateDialog=(props)=>{
  const {showAdd, setShowAdd} =props
  const classes = useStyles();
return <CModal
size="lg"
show={showAdd}
onClose={()=>setShowAdd(false)}
//onClosed={()=>setshowNewProfile(false)}
closeOnBackdrop={false}
>
<CModalHeader closeButton> <b>Điều động nhân viên công tác</b></CModalHeader>
<CModalBody>
<Grid className={classes.root} container spacing={1}>
<Grid className={classes.paper} container spacing={2}>
  <NewCollaboratePage />
</Grid>
</Grid>
</CModalBody>
<CModalFooter>
  <Button onClick={()=>{setShowAdd(false)}} variant="contained" color="primary" >Thoát</Button>
</CModalFooter>
</CModal>
}

export default AddCollaborateDialog

