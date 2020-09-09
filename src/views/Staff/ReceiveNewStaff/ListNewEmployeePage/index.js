import React, { useState } from "react";

import { Grid, Paper } from "@material-ui/core";

import Search from "./Search.Component";
import ToolBar from "./ToolBar.Component";
import NewProfile from "./NewProifile.Component";

import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content.Component";

import { GetNewStaffApi } from "../../../../callAPI/NewStaff.api";
import ReceiNewProfilesDialog from "./ReceiNewProfiles";

import { getGender, getDate, getStatusSynNew } from "../../utils/table.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  search: {},
  toolbar: {},
  content: {},
}));

const ListNewEmployeePage = (props) => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({});
  const [RowSelected, setRowSelected] = useState([]);
  const [ListProfile, setListProfile] = useState([]);

  const [showNewProfile, setshowNewProfile] = useState(false);
  const [ShowFile, setShowFile] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);
  const [Total, setTotal] = useState(0);

  const onSearch = () => {
    setCurrentPage(1);
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
      const result = await GetNewStaffApi({
        filters: filters,
        // fields: {
        //   ID: 1,
        //   CodeEmp: 1,
        //   ProfileName: 1,
        //   DateHire: 1,
        //   Gender: 1,
        //   OrgStructureID: 1,
        //   OrgStructureName: 1,
        //   PositionID: 1,
        //   PositionName: 1,
        //   StatusSyn: 1,
        // },
        page: page,
      });
      if (result.data.data) {
        const { data, meta } = result.data;
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

  return (
    <Grid className={classes.root}>
      <Grid item>
        <NewProfile
          setshowNewProfile={setshowNewProfile}
          showNewProfile={showNewProfile}
        />
        <ReceiNewProfilesDialog ShowFile={ShowFile} setShowFile={setShowFile} />
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.search}>
          <Search Filter={Filter} setFilter={setFilter} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.toolbar}>
          <ToolBar
            setshowNewProfile={setshowNewProfile}
            data={ListProfile}
            fields={defaultProfileFields}
            setShowFile={setShowFile}
            onSearch={onSearch}
            RowSelected={RowSelected}
            ListProfile={ListProfile.length > 0 ? ListProfile : RowSelected}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.content}>
          <Content
            data={ListProfile}
            fields={defaultProfileFields}
            RowSelected={RowSelected}
            setRowSelected={setRowSelected}
            CurrentPage={CurrentPage}
            setCurrentPage={setCurrentPage}
            fetchData={fetchData}
            Loading={Loading}
            PerPage={PerPage}
            totalDocuments={Total}
            scopedSlots={{
              DateHire: (item) => {
                return <td>{getDate(item.DateHire)}</td>;
              },
              Gender: (item) => {
                return <td>{getGender(item.Gender)}</td>;
              },
              StatusSyn: (item) => {
                return <td> {getStatusSynNew(item.StatusSyn)}</td>;
              },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ListNewEmployeePage;

const defaultProfileFields = [
  //{ _style: { width: "150px" }, key: "CodeEmp", label: "Mã nhân viên" },
  { _style: { width: "200px" }, key: "ProfileName", label: "Tên nhân viên" },
  { _style: { width: "150px" }, key: "DateHire", label: "Ngày nhận hồ sơ" },
  { _style: { width: "100px" }, key: "Gender", label: "Giới tính" },
  { _style: { width: "200px" }, key: "MarriageStatus", label: "Hôn nhân" },
  { _style: { width: "150px" }, key: "PositionName", label: "Chức vụ" },
  { _style: { width: "150px" }, key: "StatusSyn", label: "Trạng thái" },
  { _style: { width: "150px" }, key: "IsBlackList", label: "Danh sách đen" },
];
