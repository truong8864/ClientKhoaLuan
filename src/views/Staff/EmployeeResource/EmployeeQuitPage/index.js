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

import StopWorkingAPI from "../../../../api/hre_stop_working.api";

import { getDate } from "../../utils/table.utils";

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
  const [IsLoading, setIsLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);
  const [Total, setTotal] = useState(0);

  const [ConfimDelete, setConfimDelete] = useState(false);

  const fetchData = async (page = 1) => {
    try {
      setIsLoading(true);
      const result = await StopWorkingAPI.get({
        filters: Filter,
        // fields: {
        //   ID: 1,
        //   CodeEmp: 1,
        //   ProfileName: 1,
        //   DateStop: 1,
        //   OrgStructureID: 1,
        //   OrgStructureName: 1,
        //   StopWorkType: 1,
        //   ResignReason: 1,
        //   ReasonStopWorking: 1,
        //   PositionID: 1,
        //   PositionName: 1,
        //   Status: 1,
        //   CreateAt: 1,
        //   IsBlackList: 1,
        //   UserApprove: 1,
        //   UserCreate: 1,
        //   DateQuitApprove: 1,
        // },
        page: page,
      });
      if (result.data) {
        const { data, meta } = result;
        const { totalDocuments, totalPages } = meta;
        setListProfile(data);
        setPerPage(totalPages);
        setTotal(totalDocuments);
        setIsLoading(false);
        return;
      }
      setListProfile([]);
      setIsLoading(false);
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
  };

  const onSearch = () => {
    try {
      fetchData();
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
  };

  const onDelete = async () => {
    try {
      setRowSelected({});
      await StopWorkingAPI.remove(RowSelected._id);
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
          <ToolBar data={ListProfile}
          fields={fields}
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
            Loading={IsLoading}
            RowSelected={RowSelected}
            setRowSelected={setRowSelected}
            CurrentPage={CurrentPage}
            setCurrentPage={setCurrentPage}
            fetchData={fetchData}
            PerPage={PerPage}
            totalDocuments={Total}
            scopedSlots={{
              DateStop: (item) => {
                return <td>{getDate(item.DateStop)}</td>;
              },
              createdAt: (item) => {
                return <td>{getDate(item.createdAt)}</td>;
              },
              DateQuitApprove: (item) => {
                return <td>{getDate(item.DateQuitApprove)}</td>;
              },
            }}
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
  { _style: { width: "150px" }, key: "DateStop", label: "Ngày nghỉ việc" },
  { _style: { width: "150px" }, key: "StopWorkType", label: "Loại nghỉ việc" },
  {
    _style: { width: "150px" },
    key: "ReasonStopWorking",
    label: "Lí do nghỉ việc",
  },
  { _style: { width: "150px" }, key: "UserCreate", label: "Người tạo" },
  { _style: { width: "150px" }, key: "createdAt", label: "Ngày tạo" },
  { _style: { width: "100px" }, key: "Status", label: "Trạng thái" },
  { _style: { width: "150px" }, key: "UserApprove", label: "Người duyệt" },
  { _style: { width: "150px" }, key: "DateQuitApprove", label: "Ngày duyệt" },
  { _style: { width: "150px" }, key: "IsBlackList", label: "Danh sách đen" },
  {
    _style: { width: "150px" },
    key: "ResignReason",
    label: "Lí do danh sách đen",
  },
];
