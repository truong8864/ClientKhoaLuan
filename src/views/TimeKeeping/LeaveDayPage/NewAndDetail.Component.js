import React, { useState } from "react";
import { CModal, CModalBody, CModalFooter } from "@coreui/react";
import {
  Grid,
  TextField,
  FormControl,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import ProfileAPI from "../../../callAPI/Profile.api";

import LeaveDayAPI from "../../../api/att_leave_day.api";

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
  const { Show, setShow, document } = props;
  const [StatusOption, setStatusOption] = useState(Show.option);
  const [Document, setDocument] = useState(
    "update" === StatusOption
      ? document
      : {
          StopWorkType: "XIN_NGHI",
          DayLeave: new Date(),
        }
  );
  const [StatusModifile, setStatusModifile] = useState(false);
  const [StatusConfim, setStatusConfim] = useState(false);

  const [Err, setErr] = useState({});

  const handleOnClose = () => {
    if (StatusModifile) {
      return setStatusConfim(true);
    }
    setDocument({});
    setErr({});
    setShow({});
  };

  const onSave = async () => {
    if ("new" === StatusOption) {
      if (Err.CodeEmp || Err.CodeEmp === undefined) {
        return alert("Mã nhân viên chưa nhập hoặc nhập sai");
      }
      const res = await LeaveDayAPI.create({
        ...Document,
        Status: "CHUA_DUYET",
      });
      setDocument({
        ...res.data,
        DayLeave: new Date(res.data.DayLeave),
      });
      alert("Thêm thành công");
      setStatusOption("update");
      return setStatusModifile(false);
    }
    const { _id, ...newDocument } = Document;
    const res = await LeaveDayAPI.update(_id, newDocument);
    setDocument({
      ...Document,
      ...res.data,
      DayLeave: new Date(res.data.DayLeave),
    });
    alert("Lưu thành công");
    setStatusModifile(false);
  };

  return (
    <CModal
      size="xl"
      show={Show.show}
      onClose={handleOnClose}
      onClosed={handleOnClose}
      closeOnBackdrop={false}
    >
      <CModalBody>
        <Grid className={classes.root} container spacing={1}>
          <Grid className={classes.paper} container spacing={2}>
            <Grid item xs={3}>
              Mã nhân viên
              <TextField
                error={Err.CodeEmp}
                helperText={Err.helpTextCodeEmp}
                placeholder="Vui lòng nhập"
                disabled={"update" === StatusOption ? true : false}
                value={!Document.CodeEmp ? "" : Document.CodeEmp}
                onBlur={async () => {
                  if (!Document.CodeEmp) {
                    return setErr({
                      ...Err,
                      CodeEmp: true,
                      helpTextCodeEmp: "Chưa nhập mã nhân viên",
                    });
                  }
                  const data = await ProfileAPI.getProfilesbyCodeEmp(
                    Document.CodeEmp
                  );
                  if (1 !== data.data.length) {
                    return setErr({
                      ...Err,
                      CodeEmp: true,
                      helpTextCodeEmp: "Mã nhân viên không chính xác",
                    });
                  }
                  setDocument({
                    ...Document,
                    ProfileName: data.data[0].ProfileName,
                    ProfileID: data.data[0].ID,
                  });
                }}
                onChange={(event) => {
                  const CodeEmpInput = event.target.value;
                  setStatusModifile(true);
                  setErr({ ...Err, CodeEmp: false, helpTextCodeEmp: null });
                  if ("" !== CodeEmpInput.trim()) {
                    return setDocument({
                      ...Document,
                      CodeEmp: CodeEmpInput,
                    });
                  }
                  const { CodeEmp, ...docuent } = Document;
                  setDocument(docuent);
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
                  Ngày nghỉ
                  <div>
                    <KeyboardDatePicker
                      inputVariant="outlined"
                      size="small"
                      fullWidth={false}
                      className={classes.date}
                      format="dd/MM/yyyy"
                      value={!Document.DayLeave ? null : Document.DayLeave}
                      onChange={(date) => {
                        setDocument({ ...Document, DayLeave: date });
                        setStatusModifile(true);
                      }}
                    />
                  </div>
                </FormControl>
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item xs={3}>
              Trạng thái
              <TextField
                disabled
                value={!Document.Status ? "" : Document.Status}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid className={classes.paper} container spacing={2}>
            <Grid item xs={6}>
              Lí do
              <TextField
                placeholder="Vui lòng nhập"
                multiline
                value={!Document.LeaveReason ? "" : Document.LeaveReason}
                onChange={(event) => {
                  setStatusModifile(true);
                  const LeaveReasonInput = event.target.value;
                  if ("" !== LeaveReasonInput.trim()) {
                    return setDocument({
                      ...Document,
                      LeaveReason: LeaveReasonInput,
                    });
                  }
                  const { LeaveReason, ...docuent } = Document;
                  setDocument(docuent);
                }}
                rows={6}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              Ghi chú
              <TextField
                required
                value={!Document.Description ? "" : Document.Description}
                onChange={(event) => {
                  setStatusModifile(true);
                  const DescriptionInput = event.target.value;
                  //setErr({...Err,Description:false,helpTextDescription:null})
                  if ("" !== DescriptionInput.trim()) {
                    return setDocument({
                      ...Document,
                      Description: DescriptionInput,
                    });
                  }
                  const { Description, ...docuent } = Document;
                  setDocument(docuent);
                }}
                placeholder="Vui lòng nhập"
                multiline
                rows={6}
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
          disabled={!StatusModifile ? true : false}
          onClick={onSave}
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Lưu lại
        </Button>
        <Button variant="contained" color="primary" onClick={handleOnClose}>
          Thoát
        </Button>
        <Dialog open={StatusConfim} onClose={() => setStatusConfim(false)}>
          <DialogTitle>Công việc chưa hoàn thành</DialogTitle>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setStatusConfim(false);
              }}
              color="primary"
            >
              Tiếp tục
            </Button>
            <Button
              onClick={() => {
                setDocument({});
                setErr({});
                setShow({});
                setStatusConfim(false);
              }}
              color="primary"
              autoFocus
            >
              Thoát
            </Button>
          </DialogActions>
        </Dialog>
      </CModalFooter>
    </CModal>
  );
};

export default NewAndDetail;
