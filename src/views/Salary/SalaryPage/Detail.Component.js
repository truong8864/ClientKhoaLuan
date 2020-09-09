import React, { useState, useEffect } from "react";
import { CModal, CModalBody, CModalFooter } from "@coreui/react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  InputAdornment,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    //padding: theme.spacing(1),
  },
  date: {},
}));

const NewAndDetail = (props) => {
  const classes = useStyles();
  const { document, show, onSave } = props;

  const [Open, setOpen] = useState(false);
  const [Document, setDocument] = useState(document);
  const [Modifile, setModifile] = useState(false);
  const [ConfimExit, setConfimExit] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleOnClose = () => {
    if (Modifile) return setConfimExit(true);
    show(false);
  };

  const handleOnSave = () => {
    const { _id, ...data } = Document;
    onSave(_id, data);
    alert("Lưu thành công");
    setModifile(false);
  };

  return (
    <CModal
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
                disabled
                value={Document.CodeEmp}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              Tên nhân viên
              <TextField
                value={Document.ProfileName}
                disabled
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              Kì công
              <TextField
                disabled
                value={Document.KiCong}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              Trạng thái
              <TextField
                value={Document.Status}
                disabled
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid className={classes.paper} container spacing={2}>
            <Grid item xs={3}>
              Ngày công
              <TextField
                //disabled
                value={Document.TotalKeepingReality}
                onChange={(event) => {
                  const value = parseFloat(event.target.value);
                  setDocument({
                    ...Document,
                    TotalKeepingReality: value,
                    Salary:
                      Math.ceil(
                        ((value / 26) * Document.SalaryContract) / 100
                      ) * 100,
                  });
                  setModifile(true);
                }}
                inputProps={{
                  type: "number",
                  min: 0,
                  max: 33,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Ngày</InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              Hợp đồng
              <TextField
                disabled
                value={Document.SalaryContract}
                inputProps={{
                  type: "number",
                  min: 0,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">VNĐ/Tháng</InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              Tính lương
              <TextField
                disabled
                value={Document.Salary}
                inputProps={{
                  type: "number",
                  min: 0,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">VNĐ</InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            {
              //   <Grid item xs={3}>
              //   TONG CONG
              //    <TextField
              //      disabled
              //      value={Math.ceil((parseInt(Document.TotalKeepingReality)/(1000*60*60*8))*100)/100}
              //      InputProps={{
              //        type:"number",
              //        endAdornment:<InputAdornment position="end">Ngày</InputAdornment>,
              //      }}
              //      variant="outlined"
              //      size="small"
              //      fullWidth
              //    />
              //  </Grid>
            }
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              Ghi chú
              <TextField
                required
                value={!Document.Description ? "" : Document.Description}
                onChange={(event) => {
                  setModifile(true);
                  const DescriptionInput = event.target.value;
                  setDocument({
                    ...Document,
                    Description: DescriptionInput,
                  });
                  setModifile(true);
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
        <Button
          disabled={!Modifile}
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
          onClick={handleOnSave}
        >
          Lưu lai
        </Button>
        <Button variant="contained" color="primary" onClick={handleOnClose}>
          Thoát
        </Button>
        <Dialog
          open={ConfimExit}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle>Công việc đang làm chưa hoàn thành</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfimExit(false)} color="primary">
              Tiếp tục
            </Button>
            <Button onClick={() => show(false)} color="primary" autoFocus>
              Thoát
            </Button>
          </DialogActions>
        </Dialog>
      </CModalFooter>
    </CModal>
  );
};

export default NewAndDetail;
