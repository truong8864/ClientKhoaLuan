import React, { useState } from "react";

import DayKeepingAPI from "../../../api/att_day_keeping.api";

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
import NewAndDetail from "./NewAndDetail.Component";

import {
  getDate,
  getTime,
  getDays,
  getHours,
} from "../../Staff/utils/table.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //height: "100vh" ,
    // paddingLeft: theme.spacing(1)
  },
  search: {},
  toolbar: {
    //marginBottom: "0px",
    marginTop: "4px",
  },
}));

const TimeKeepingDayPage = () => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({});

  const [RowsSelected, setRowsSelected] = useState([]);

  const [ListDataTimeKeeping, setListDataTimeKeeping] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);
  const [Total, setTotal] = useState(0);

  const [Option, setOption] = useState(null);

  const [ConfimDelete, setConfimDelete] = useState(false);

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
      const result = await DayKeepingAPI.get({
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

  const searchDataTimeKeeping = async () => {
    setCurrentPage(1);
    fetchData();
  };

  const reload = () => {
    fetchData();
  };

  const onDelete = async () => {
    await DayKeepingAPI.remove(RowsSelected[0]._id);
    setRowsSelected([]);
    setConfimDelete(false);
    reload();
  };
  const onCalculateTimeKeeping = async () => {
    alert("haha");
    setLoading(true);
    // const listCalculate = RowsSelected.filter((item) => {
    //   return "DA_TINH_CONG" !== item.Status;
    // });
    await DayKeepingAPI.calculate({
      filters: Filter,
    });
    setRowsSelected([]);
    reload();
    setLoading(false);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.search}>
          {!Option ? null : (
            <NewAndDetail
              document={"update" !== Option ? null : RowsSelected[0]}
              option={Option}
              show={setOption}
            />
          )}
          {<Search Filter={Filter} setFilter={setFilter} />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.toolbar} variant="outlined">
          <ToolBar
            data={ListDataTimeKeeping}
            fields={fields}
            setConfimDelete={setConfimDelete}
            show={setOption}
            onCalculateTimeKeeping={onCalculateTimeKeeping}
            RowsSelected={RowsSelected}
            searchDataTimeKeeping={searchDataTimeKeeping}
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
              DateKeeping: (item) => {
                return <td>{`${getDate(item.DateKeeping)}`}</td>;
              },
              TimeIn: (item) => {
                return <td>{`${getTime(item.TimeIn)}`}</td>;
              },
              TimeOut: (item) => {
                return <td>{`${getTime(item.TimeOut)}`}</td>;
              },
              TotalDay: (item) => {
                return <td>{`${getDays(item.Total)} ngày`}</td>;
              },
              TotalHours: (item) => {
                return <td>{`${getHours(item.Total)} giờ`}</td>;
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

export default TimeKeepingDayPage;

const fields = [
  //{ _style: { width: "250px" }, key: "ProfileID", label: "ProfileID" },
  { _style: { width: "150px" }, key: "DateKeeping", label: "Ngày" },
  {
    _style: { width: "150px" },
    key: "Status",
    label: "Trạng thái",
  },
  { _style: { width: "100px" }, key: "TimeIn", label: "Giờ vào" },
  { _style: { width: "100px" }, key: "TimeOut", label: "Giờ ra" },

  { _style: { width: "120px" }, key: "CodeEmp", label: "Mã nhân viên" },
  { _style: { width: "200px" }, key: "ProfileName", label: "Tên nhân viên" },
  {
    _style: { width: "300px" },
    key: "OrgStructureName",
    label: "Phòng ban",
  },

  {
    _style: { width: "100px" },
    key: "TotalHours",
    label: "Giờ công",
  },
  { _style: { width: "100px" }, key: "TotalDay", label: "Ngày công" },

  {
    _style: { width: "250px" },
    key: "TimeKeepingType",
    label: "Loại chấm công",
  },

  { _style: { width: "250px" }, key: "Description ", label: "Ghi chú" },
];
