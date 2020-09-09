import React ,{useState,useEffect}from "react"
import { CModal, CModalBody, CModalFooter } from "@coreui/react"
import { Grid, TextField, FormControl ,FormHelperText,makeStyles, Button,
Dialog,DialogTitle,DialogActions
} from "@material-ui/core"



import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";


 import ProfileAPI from "../../../../callAPI/Profile.api"
 import TimeKeepingAPI from "../../../../callAPI/Att_TimeKeeping.api";

// import StopWorkingAPI from "../../../../callAPI/Hre_StopWorking.api"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    //padding: theme.spacing(1),
  },
  date: {
   
  },
}));


const NewAndDetail=(props)=>{

  const classes = useStyles();
  const {option,document,show} =props

  const [Open, setOpen] = useState(false)
  const [Document, setDocument] = useState('update'===option?document:{
      DateKeeping:new Date(new Date().toDateString()),
      TimeIn: new Date(`${new Date().toDateString()} 09:00`),
      TimeOut: new Date(`${new Date().toDateString()} 17:00`),
  })

  const [Option, setOption] = useState(option)
  const [Err, setErr] = useState({})
  const [Modifile, setModifile] = useState(false)
  const [Confim, setConfim] = useState(false)
  
  useEffect(()=>{
    setOpen(true)
  },[])

  const handleOnClose=()=>{
    if(Modifile)
        return setConfim(true)
    show(null)
  }

  const onSave=async()=>{
      if(!Document.CodeEmp||Err.CodeEmp||Err.TimeIn||Err.TimeOut)
      return alert("DU LIEU CON THIEU HOAC BI LOI")
      if("update"!==Option){
        const res = await TimeKeepingAPI.create(Document)
        alert("Thêm thành công")
        setDocument(res.data.data)
        setOption("update")
       return setModifile(false)
      }
      const {_id,...data}=Document
      await TimeKeepingAPI.update(_id,data)
      alert("Lưu thành công")
      setModifile(false)
     
  }

  return <CModal
    size="xl"
    show={Open}
    onClose={handleOnClose}
    closeOnBackdrop={false}
    >
<CModalBody>
<Grid className={classes.root} container spacing={1}>
<Grid className={classes.paper} container spacing={2}>
  <Grid item xs={3}>
    Mã nhân viên
    <TextField
      error={!Err.CodeEmp?false:true}
      helperText={!Err.CodeEmp?null:Err.CodeEmp}
      placeholder="Vui lòng nhập"
      disabled={"update"===Option?true:false}
      value={!Document.CodeEmp?"":Document.CodeEmp}
      onBlur={ async()=>{
          if(!Document.CodeEmp)
          { 
            return setErr({...Err,CodeEmp:"Chưa nhập mã nhân viên"})    
          }
          const data = await ProfileAPI.getProfilesbyCodeEmp(Document.CodeEmp)
          if(1!==data.data.length){
            return setErr({...Err,CodeEmp:"Mã nhân viên không chính xác"})   
          }
          setErr({...Err,CodeEmp:null})   
          setDocument({...Document,ProfileName:data.data[0].ProfileName})
      }}
      onChange={(event) => {
         const CodeEmpInput=event.target.value;
         setModifile(true)
         //setErr({...Err,CodeEmp:false,helpTextCodeEmp:null})   
         if(""!==CodeEmpInput.trim()){
            return setDocument({
                ...Document,
                CodeEmp: CodeEmpInput
              });
         }
         const {CodeEmp ,...docuent}=Document
         setDocument(docuent)
      }}
      variant="outlined"
      size="small"
      fullWidth
    />
  </Grid>
  <Grid item xs={3}>
    Tên nhân viên
    <TextField
      value={!Document.ProfileName ? "" : Document.ProfileName}
      disabled
      variant="outlined"
      size="small"
      fullWidth
    />
  </Grid>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid item xs={2}>
    <FormControl fullWidth>
        Ngày
        <div >
        <KeyboardDatePicker
            inputVariant="outlined"
            size="small"
            disabled={"update"===Option}
            fullWidth={false}
            className={classes.date}
            format="dd/MM/yyyy"
            value={Document.DateKeeping}
            onChange={(date) => {
             setDocument({...Document,DateKeeping:date})
             setModifile(true)
            }}           
        />      
        </div>              
    </FormControl>    
    </Grid>
    <Grid item xs={2}>
    <FormControl error={Err.TimeIn!==null}  fullWidth>
       Giờ vào
        <KeyboardTimePicker
            ampm={false}
            inputVariant="outlined"
            size="small"
            fullWidth={false}
            className={classes.date}
            value={Document.TimeIn}
            onChange={(date) => {
             const check=(new Date(date)>=new Date(Document.TimeOut))
             if(check){
                return setErr({...Err,TimeIn:"GIO VAO K THE LON HON HOAC BANG GIO RA"})
             }
             setErr({...Err,TimeIn:null})
             setDocument({...Document,TimeIn:date})
             setModifile(true)
            }}           
        />     
    <FormHelperText>{Err.TimeIn}</FormHelperText>          
    </FormControl>    
    </Grid>
    <Grid item xs={2}>
    <FormControl error={Err.TimeOut!==null} fullWidth>
        Giờ ra
        <KeyboardTimePicker
            ampm={false}
            inputVariant="outlined"
            size="small"
            fullWidth={false}
            className={classes.date}
            value={Document.TimeOut }
            onChange={(date) => {
            const check=(new Date(date)<=new Date(Document.TimeIn))
             if(check){
                return setErr({...Err,TimeOut:"GIO RA K THE NHO HON HOAC BANG GIO VAO"})
             }
             setErr({...Err,TimeOut:null})
             setDocument({...Document,TimeOut:date})
             setModifile(true)
            }}           
        />  
    <FormHelperText>{Err.TimeOut}</FormHelperText>                   
    </FormControl>    
    </Grid>     
 </MuiPickersUtilsProvider>
</Grid>

<Grid className={classes.paper} container spacing={2}>
<Grid item xs={6}>
{"update"!==Option?null:(<Grid container spacing={2}> 
<Grid item xs={6}>
    <Grid>
    Loại chấm công
    <TextField
      value={!Document.TimeKeepingType ? "" : Document.TimeKeepingType}
      disabled
      variant="outlined"
      size="small"
      fullWidth
    />
    </Grid>
    <Grid>
      Giờ công
    <TextField
      value={!Document.Total ? "" : Math.ceil((parseInt(Document.Total)/(1000*60*60))*10)/10}
      disabled
      variant="outlined"
      size="small"
      fullWidth
    />
    </Grid>
  </Grid>
<Grid item xs={6}>
    <Grid>
    Trạng thái
    <TextField
      value={!Document.Status ? "" : Document.Status}
      disabled
      variant="outlined"
      size="small"
      fullWidth
    />
    </Grid>
    <Grid>
    Ngày công
    <TextField
      value={!Document.Total ? "" : Math.ceil((parseInt(Document.Total)/(1000*60*60*8))*100)/100}
      disabled
      variant="outlined"
      size="small"
      fullWidth
    />
    </Grid>
  </Grid>
</Grid>
)}
</Grid>
<Grid item xs={6}>
    Ghi chú
    <TextField
      required
      value={!Document.Description?"":Document.Description}
      onChange={(event) => {
        setModifile(true)
        const DescriptionInput=event.target.value;
            setDocument({
               ...Document,
               Description: DescriptionInput
             });
        }}
      placeholder="Vui lòng nhập"
      multiline
      rows={5}
      variant="outlined"
      size="small"
      fullWidth
    />
    </Grid>
</Grid>
 </Grid>
</CModalBody>
<CModalFooter>
  <Button disabled={!Modifile}  variant="contained" color="primary" style={{marginRight:"10px"}} onClick={onSave} >Lưu lai</Button>
  <Button variant="contained" color="primary" onClick={handleOnClose} >Thoát</Button>
    <Dialog
      open={Confim}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      onClose={()=>setConfim(false)}
    >
      <DialogTitle >Công việc chưa hoàn thành</DialogTitle>
       <DialogActions>
          <Button onClick={()=>setConfim(false)} color="primary">
            Tiếp tục
          </Button>
          <Button onClick={()=>show(false)} color="primary" autoFocus>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
</CModalFooter>
</CModal>
}

export default NewAndDetail