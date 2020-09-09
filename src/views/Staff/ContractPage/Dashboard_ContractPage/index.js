import React, { useState } from "react";

import { Grid, Paper } from "@material-ui/core";

import Search from "./Search.Component";
import ToolBar from "./ToolBar.Component";
import NewProfile from "./NewProifile.Component";

import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content.Component";

import { ListContractApi } from "../../../../callAPI/Hre_Contract.api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  search: {},
  toolbar: {},
  content: {},
}));

const fields = [
  // { key: 'ContractNo',_style: { width: '300px'}, label: "Số hợp đồng" },
  { key: "CodeEmp", _style: { width: "150px" }, label: "Mã nhân viên" },
  { key: "ProfileName", _style: { width: "300px" }, label: "Họ và tên" },
  { key: "Gender", _style: { width: "300px" }, label: "Giới tính" },
  { key: "DateHire", _style: { width: "300px" }, label: "Ngày tuyển" },
  { key: "DateSigned", _style: { width: "300px" }, label: "Ngày kí hợp đồng" },
  { key: "DateStart", _style: { width: "300px" }, label: "Ngày có hiệu lực" },
  { key: "DateEnd", _style: { width: "300px" }, label: "Ngày hết hạn" },
];

const ContractPage = (props) => {
  const classes = useStyles();

  const [Filter, setFilter] = useState({});
  const [RowSelected, setRowSelected] = useState({});
  const [ListProfile, setListProfile] = useState([]);

  const [showNewProfile, setshowNewProfile] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);
  const [Total, setTotal] = useState(0);

  const onSearch = async () => {
    try {
      setCurrentPage(1);
      fetchData();
    } catch (error) {
      console.log("DanhSachNhanVien ProfileAPI ERR", error);
    }
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
      const result = await ListContractApi({
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
            onSearch={onSearch}
            RowSelected={RowSelected}
            data={ListProfile}
            header={fields}
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
    </Grid>
  );
};

export default ContractPage;
