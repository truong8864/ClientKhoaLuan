import React ,{useState,useEffect}from "react"
import { CModal, CModalBody, CModalFooter } from "@coreui/react"
import { Grid, TextField, FormControl,makeStyles, Button,
Dialog,DialogTitle,DialogActions, InputAdornment
} from "@material-ui/core"



import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";


 import {GetContractApi} from "../../../../callAPI/Hre_Contract.api"
 import ContractExtendAPI from "../../../../callAPI/Hre_ContractExtend.api";




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
      DateStart:new Date(),
      DateEnd: new Date(new Date()+1000*60*60*24*60)
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
      if(!Document.ContractNo||Err.ContractNo||Err.TimeIn||Err.TimeOut)
      return alert("DU LIEU CON THIEU HOAC BI LOI")
      if("update"!==Option){
        const res = await ContractExtendAPI.create(Document)
        alert("Thêm thành công")
        setDocument(res.data.data)
        setOption("update")
       return setModifile(false)
      }
      const {_id,...data}=Document
      await ContractExtendAPI.update(_id,data)
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
    Số hợp đồng
    <TextField
      error={!Err.ContractNo?false:true}
      helperText={!Err.ContractNo?null:Err.ContractNo}
      placeholder="Vui lòng nhập"
      disabled={"update"===Option?true:false}
      value={!Document.ContractNo?"":Document.ContractNo}
      onBlur={ async()=>{
          if(!Document.ContractNo)
          { 
            return setErr({...Err,ContractNo:"Chưa nhập số hợp đồng"})    
          }
          const data = await GetContractApi({ContractNo:Document.ContractNo})
          if(1!==data.data.length){
            return setErr({...Err,ContractNo:"Số hợp đồng không chính xác"})   
          }
          if(new Date(data.data[0].DateEnd)<new Date()){
            return setErr({...Err,ContractNo:"Hợp đồng đã hết hạn"})   
          }
          setErr({...Err,ContractNo:null})   
          setDocument({...Document,ContractID:data.data[0].ContractID})
      }}
      onChange={(event) => {
         const ContractNoInput=event.target.value;
         setModifile(true)
         //setErr({...Err,ContractNo:false,helpTextContractNo:null})   
         if(""!==ContractNoInput.trim()){
            return setDocument({
                ...Document,
                ContractNo: ContractNoInput
              });
         }
         const {ContractNo ,...docuent}=Document
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
    <Grid item xs={3}>
    <FormControl fullWidth>
        Ngày bắt đầu
        <div >
        <KeyboardDatePicker
            inputVariant="outlined"
            size="small"
            disabled={"update"===Option}
            fullWidth={false}
            className={classes.date}
            format="dd/MM/yyyy"
            value={Document.DateStart}
            onChange={(date) => {
             setDocument({...Document,DateStart:date})
             setModifile(true)
            }}           
        />      
        </div>              
    </FormControl>    
    </Grid>
    <Grid item xs={3}>
    <FormControl fullWidth>
        Ngày kết thúc
        <div >
        <KeyboardDatePicker
            inputVariant="outlined"
            size="small"
            disabled={"update"===Option}
            fullWidth={false}
            className={classes.date}
            format="dd/MM/yyyy"
            value={Document.DateEnd}
            onChange={(date) => {
             setDocument({...Document,DateEnd:date})
             setModifile(true)
            }}           
        />      
        </div>              
    </FormControl>    
    </Grid>
 </MuiPickersUtilsProvider>
</Grid>

<Grid className={classes.paper} container spacing={2}>
<Grid item xs={6}>
{(<Grid container spacing={2}> 
<Grid item xs={6}>
    <Grid>
    Lương mới
    <TextField
         value={Document.SalaryContract}
        inputProps={{
          type:"number",
          min:0,
        }
        }
        InputProps={
        {
          endAdornment:<InputAdornment position="end">VNĐ/Tháng</InputAdornment>
        }
      }
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