import React, { useState } from "react";

import {
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";

import Search from "./Search.Component";
import ToolBar from "./ToolBar.Component";

import { makeStyles } from "@material-ui/core/styles";

import Content from "./Content.Component";
import NewAndDetail from "./NewAndDetail.Component";

import LevaeDayAPI from "../../../api/att_leave_day.api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {},
  toolbar: {},
  content: {},
}));

const EmployeeQuitPage = (props) => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({});
  const [ShowNewAndDetail, setShowNewAndDetail] = useState({
    show: false,
    option: "new",
  });
  const [RowSelected, setRowSelected] = useState({});
  const [ListProfile, setListProfile] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);
  const [Total, setTotal] = useState(0);

  const [ConfimDelete, setConfimDelete] = useState(false);

  const onSearch = () => {
    fetchData();
  };

  const fetchData = async (page = 1) => {
    try {
      const filters = { ...Filter };
      if (filters.ProfileName || filters.ProfileName === "") {
        filters.ProfileName = filters.ProfileName.trim();
        if (filters.ProfileName === "") {
          delete filters.ProfileName;
        }
      }

      setLoading(true);
      const result = await LevaeDayAPI.get({
        filters: filters,
        page: page,
      });
      if (result.data) {
        const { data, meta } = result;
        const { totalDocuments, totalPages } = meta;
        setListProfile(data);
        setPerPage(totalPages);
        setTotal(totalDocuments);
        setLoading(false);
        return;
      }
      setListProfile([]);
      setLoading(false);
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
  };

  const onDelete = async () => {
    try {
      setRowSelected({});
      await LevaeDayAPI.remove(RowSelected._id);
      const index = ListProfile.findIndex(
        (item) => item._id === RowSelected._id
      );
      if (-1 !== index)
        setListProfile([
          ...ListProfile.slice(0, index),
          ...ListProfile.slice(index + 1, ListProfile.length),
        ]);
      setConfimDelete(false);
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
  };

  return (
    <Grid className={classes.root}>
      {!ShowNewAndDetail.show ? null : (
        <NewAndDetail
          Show={ShowNewAndDetail}
          document={RowSelected}
          setShow={setShowNewAndDetail}
        />
      )}
      <Grid item>
        <Paper variant="outlined" className={classes.search}>
          <Search Filter={Filter} setFilter={setFilter} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.toolbar}>
          <ToolBar
            onSearch={onSearch}
            setShowNewAndDetail={setShowNewAndDetail}
            RowSelected={RowSelected}
            setConfimDelete={setConfimDelete}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.content}>
          <Content
            data={ListProfile}
            fields={fields}
            RowSelected={RowSelected}
            setRowSelected={setRowSelected}
            CurrentPage={CurrentPage}
            setCurrentPage={setCurrentPage}
            fetchData={fetchData}
            Loading={Loading}
            PerPage={PerPage}
            totalDocuments={Total}
          />
        </Paper>
      </Grid>
      <Dialog
        open={ConfimDelete}
        // disableBackdropClick={true}
        // disableEscapeKeyDown={true}
        onClose={() => setConfimDelete(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfimDelete(false)} color="primary">
            Không
          </Button>
          <Button onClick={onDelete} color="primary" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EmployeeQuitPage;

const fields = [
  { _style: { width: "150px" }, key: "CodeEmp", label: "Mã nhân viên" },
  { _style: { width: "200px" }, key: "ProfileName", label: "Tên nhân viên" },
  {
    _style: { width: "300px" },
    key: "OrgStructureName",

    label: "Phòng ban",
  },
  { _style: { width: "150px" }, key: "DayLeave", label: "Ngày nghỉ" },
  { _style: { width: "150px" }, key: "LeaveReason", label: "Lí do" },
  { _style: { width: "150px" }, key: "Description", label: "Ghi chú" },
  { _style: { width: "100px" }, key: "Status", label: "Trạng thái" },
];
