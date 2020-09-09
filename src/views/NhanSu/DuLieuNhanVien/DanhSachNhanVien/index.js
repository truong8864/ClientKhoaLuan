import React, { useEffect, useState } from "react";

import { Grid, Paper } from "@material-ui/core";

import Search from "./Search";
import ToolBar from "./ToolBar";

import ProfileAPI from "../../../../api2/hre_profile.api";

import { makeStyles } from "@material-ui/core/styles";

import Table from "../../../../share2/component/Table.component";
import YesNoDialog from "../../../../share2/component/YesNoDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {},
  toolbar: {},
  content: {},
}));

const DanhSachNhanVien = (props) => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({});
  const [RowSelected, setRowSelected] = useState(null);
  const [Data, setData] = useState([]);

  // const fetchData = async () => {

  // }

  const onSearch = async (page = 1) => {
    try {
      const res = await ProfileAPI.get({
        filters: Filter,
        page,
      });
      setData(res.data);
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
  };

  return (
    <Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.search}>
          {
            // <YesNoDialog />
          }
          <Search Filter={Filter} setFilter={setFilter} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.toolbar}>
          <ToolBar RowSelected={RowSelected} onSearch={onSearch} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.content}>
          <Table fields={fields} items={Data} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DanhSachNhanVien;

const fields = [
  { _style: { width: "200px" }, key: "ProfileName", label: "ProfileName" },
  { _style: { width: "200px" }, key: "NameFamily", label: "NameFamily" },
  { _style: { width: "200px" }, key: "FirstName", label: "FirstName" },
  { _style: { width: "200px" }, key: "NameEnglish", label: "NameEnglish" },
  { _style: { width: "200px" }, key: "Code", label: "Code" },
  { _style: { width: "200px" }, key: "CodeTax", label: "CodeTax" },
  {
    _style: { width: "200px" },
    key: "CodeAttendance",
    label: "CodeAttendance",
  },
  { _style: { width: "200px" }, key: "StatusSyn", label: "StatusSyn" },
  { _style: { width: "200px" }, key: "DateHire", label: "DateHire" },
  {
    _style: { width: "200px" },
    key: "DateEndProbation",
    label: "DateEndProbation",
  },
  { _style: { width: "200px" }, key: "DateQuit", label: "DateQuit" },
  {
    _style: { width: "200px" },
    key: "OrgStructureID",
    label: "OrgStructureID",
  },
  { _style: { width: "200px" }, key: "PositionID", label: "PositionID" },
  { _style: { width: "200px" }, key: "DateOfEffect", label: "DateOfEffect" },
  { _style: { width: "200px" }, key: "Gender", label: "Gender" },
  { _style: { width: "200px" }, key: "DateOfBirth", label: "DateOfBirth" },
  { _style: { width: "200px" }, key: "PlaceOfBirth", label: "PlaceOfBirth" },
  { _style: { width: "200px" }, key: "IDNo", label: "IDNo" },
  { _style: { width: "200px" }, key: "IDDateOfIssue", label: "IDDateOfIssue" },
  {
    _style: { width: "200px" },
    key: "IDPlaceOfIssue",
    label: "IDPlaceOfIssue",
  },
  { _style: { width: "200px" }, key: "PassportNo", label: "PassportNo" },
  {
    _style: { width: "200px" },
    key: "PassportDateOfExpiry",
    label: "PassportDateOfExpiry",
  },
  {
    _style: { width: "200px" },
    key: "PassportDateOfIssue",
    label: "PassportDateOfIssue",
  },
  {
    _style: { width: "200px" },
    key: "PassportPlaceOfIssue",
    label: "PassportPlaceOfIssue",
  },
  { _style: { width: "200px" }, key: "Cellphone", label: "Cellphone" },
  {
    _style: { width: "200px" },
    key: "MarriageStatus",
    label: "MarriageStatus",
  },
  { _style: { width: "200px" }, key: "DayOfBirth", label: "DayOfBirth" },
  { _style: { width: "200px" }, key: "MonthOfBirth", label: "MonthOfBirth" },
  { _style: { width: "200px" }, key: "YearOfBirth", label: "YearOfBirth" },
  {
    _style: { width: "200px" },
    key: "DateApplyAttendanceCode",
    label: "DateApplyAttendanceCode",
  },
  { _style: { width: "200px" }, key: "PAddress", label: "PAddress" },
  { _style: { width: "200px" }, key: "ProbationTime", label: "ProbationTime" },
  {
    _style: { width: "200px" },
    key: "ProbationTimeUnit",
    label: "ProbationTimeUnit",
  },
  {
    _style: { width: "200px" },
    key: "OrgStructureCode",
    label: "OrgStructureCode",
  },
  { _style: { width: "200px" }, key: "PositionCode", label: "PositionCode" },

  { _style: { width: "200px" }, key: "UserCreate", label: "UserCreate" },
  { _style: { width: "200px" }, key: "UserUpdate", label: "UserUpdate" },

  ///nguoi tao
  //nguoi cap nhat
];
