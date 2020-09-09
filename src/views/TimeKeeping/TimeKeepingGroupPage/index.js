import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

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
import Content from "./Content.Component";
import Detail from "./Detail.Component";

import TimeKeepingGroupAPI from "../../../api/att_time_keeping_group.api";

import { getDays } from "../../Staff/utils/table.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //height: "100vh" ,
  },
  search: { paddingLeft: theme.spacing(1) },
  toolbar: {
    paddingLeft: theme.spacing(0),
    marginTop: "4px",
  },
  content: {},
}));

const TimeKeepingGroupPage = () => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({});
  const [ListDataTimeKeeping, setListDataTimeKeeping] = useState([]);
  const [RowsSelected, setRowsSelected] = useState(null);
  const [ShowDetail, setShowDetail] = useState(false);
  const [ConfimDelete, setConfimDelete] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);
  const [Total, setTotal] = useState(0);

  const onSearch = async () => {
    setCurrentPage(1);
    fetchData();
  };

  const onSave = async (id, data) => {
    const res = await TimeKeepingGroupAPI.update(id, data);
    setRowsSelected(res.data.data);
    const index = ListDataTimeKeeping.findIndex(
      (item) => item._id === res.data.data._id
    );
    setListDataTimeKeeping([
      ...ListDataTimeKeeping.slice(0, index),
      res.data.data,
      ...ListDataTimeKeeping.slice(index + 1, ListDataTimeKeeping.length),
    ]);
  };

  const onDelete = async () => {
    await TimeKeepingGroupAPI.deleteX(RowsSelected._id);
    const index = ListDataTimeKeeping.findIndex(
      (item) => item._id === RowsSelected._id
    );
    setListDataTimeKeeping([
      ...ListDataTimeKeeping.slice(0, index),
      ...ListDataTimeKeeping.slice(index + 1, ListDataTimeKeeping.length),
    ]);
    setRowsSelected(null);
    setConfimDelete(false);
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
      const result = await TimeKeepingGroupAPI.get({
        filters: filters,
        page: page,
      });
      if (result.data) {
        const { data, meta } = result;
        const { totalDocuments, totalPages } = meta;
        setListDataTimeKeeping(data);
        setPerPage(totalPages);
        setTotal(totalDocuments);
        setLoading(false);
        return;
      }
      setListDataTimeKeeping([]);
      setLoading(false);
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        {!ShowDetail ? null : (
          <Detail
            onSave={onSave}
            document={RowsSelected}
            show={setShowDetail}
          />
        )}
        <Paper className={classes.search}>
          {<Search Filter={Filter} setFilter={setFilter} />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.toolbar} variant="outlined">
          <ToolBar  fields={fields} data={ListDataTimeKeeping}
            setConfimDelete={setConfimDelete}
            show={setShowDetail}
            onSearch={onSearch}
            RowsSelected={RowsSelected}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.content}>
          <Content
            fields={fields}
            RowsSelected={RowsSelected}
            setRowsSelected={setRowsSelected}
            data={ListDataTimeKeeping}
            CurrentPage={CurrentPage}
            setCurrentPage={setCurrentPage}
            fetchData={fetchData}
            Loading={Loading}
            PerPage={PerPage}
            totalDocuments={Total}
            scopedSlots={{
              TotalKeepingReality: (item) => {
                return <td>{`${getDays(item.TotalKeepingReality)} ngày `}</td>;
              },
              SabbaticalLeave: (item) => {
                return <td>{`${getDays(item.SabbaticalLeave)} ngày`}</td>;
              },
              UnSabbaticalLeave: (item) => {
                return <td>{`${getDays(item.UnSabbaticalLeave)} ngày`}</td>;
              },
              SumKeeping: (item) => {
                return <td>{`${getDays(item.SumKeeping)} ngày`}</td>;
              },
            }}
          />
        </Paper>
      </Grid>
      <Dialog
        open={ConfimDelete}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>XAC NHAN XOA</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfimDelete(false)} color="primary">
            Khong
          </Button>
          <Button onClick={onDelete} color="primary" autoFocus>
            Co
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default TimeKeepingGroupPage;

const fields = [
  { _style: { width: "80px" }, key: "KiCong", label: "Kì công" },
  // { _style: { width: "150px" }, key: "Year", label: "Năm" },
  // { _style: { width: "150px" }, key: "Month", label: "Tháng" },
  { _style: { width: "120px" }, key: "CodeEmp", label: "Mã nhân viên" },
  { _style: { width: "200px" }, key: "ProfileName", label: "Tên nhân viên" },
  {
    _style: { width: "250px" },
    key: "OrgStructureName",
    label: "Phòng ban",
  },
  {
    _style: { width: "150px" },
    key: "TotalKeepingReality",
    label: "Ngày công thực tế",
  },
  {
    _style: { width: "150px" },
    key: "SabbaticalLeave",
    label: "Nghỉ có phép",
  },
  {
    _style: { width: "150px" },
    key: "UnSabbaticalLeave",
    label: "Nghỉ không phép",
  },
  { _style: { width: "150px" }, key: "SumKeeping", label: "Tổng hợp công" },
  { _style: { width: "250px" }, key: "Description", label: "Ghi chú" },
  {
    _style: { width: "150px" },
    key: "Status",
    label: "Trạng thái",
  },
];
