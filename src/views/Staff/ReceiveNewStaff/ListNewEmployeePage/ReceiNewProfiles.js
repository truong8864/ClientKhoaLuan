import React from "react"
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react"
import {  Button} from "@material-ui/core"
import ReceiveNewStaffPage from "../ReceiveNewEmployee";



const ReceiNewProfilesDialog=(props)=>{
  const {ShowFile, setShowFile} =props
return <CModal
size="lg"
show={ShowFile}
onClose={()=>setShowFile(false)}
//onClosed={()=>setshowNewProfile(false)}
closeOnBackdrop={false}
>
<CModalHeader closeButton><b>Tiếp nhận nhân viên mới</b></CModalHeader>
<CModalBody>
  <ReceiveNewStaffPage />
</CModalBody>
<CModalFooter>
  <Button onClick={()=>{setShowFile(false)}} variant="contained" color="primary" >Thoát</Button>
</CModalFooter>
</CModal>
}

export default ReceiNewProfilesDialog

