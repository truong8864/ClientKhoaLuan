import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Grid, Paper } from "@material-ui/core";

import Search from "./Search.Component";
import ToolBar from "./ToolBar.Component";
import Content from "./Content.Component";

import DayKeepingAPI from "../../../api/att_day_keeping.api";
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

const CalculateKeepingPage = () => {
  const classes = useStyles();

  const initDate = new Date();
  initDate.setDate(0);
  initDate.setHours(0);

  const [Filter, setFilter] = useState({ KiCong: initDate });

  const [ListDataTimeKeeping, setListDataTimeKeeping] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);
  const [Total, setTotal] = useState(0);

  const TongHopCong = async () => {
    if (!Filter.OrgStructureID) {
      alert("Chưa chọn phòng ban");
      return;
    }
    const strKiCong = `${("0" + (Filter.KiCong.getMonth() + 1)).slice(
      -2
    )}/${Filter.KiCong.getFullYear()}`;
    setLoading(true);
    await DayKeepingAPI.synthesis({
      ...Filter,
      KiCong: strKiCong,
    });

    setCurrentPage(1);
    fetchData();
  };

  const fetchData = async (page = 1) => {
    try {
      const filters = { ...Filter };

      const strKiCong = `${("0" + (Filter.KiCong.getMonth() + 1)).slice(
        -2
      )}/${Filter.KiCong.getFullYear()}`;

      setLoading(true);
      const result = await TimeKeepingGroupAPI.get({
        filters: { ...filters, KiCong: strKiCong },
        page: page,
      });
      if (result.data) {
        console.log(result.data);
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
        <Paper className={classes.search}>
          {<Search Filter={Filter} setFilter={setFilter} />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.toolbar} variant="outlined">
          <ToolBar TongHopCong={TongHopCong} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.content}>
          <Content
            fields={fields}
            data={ListDataTimeKeeping}
            setCurrentPage={setCurrentPage}
            fetchData={fetchData}
            Loading={Loading}
            PerPage={PerPage}
            totalDocuments={Total}
            CurrentPage={CurrentPage}
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
    </Grid>
  );
};

export default CalculateKeepingPage;

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
