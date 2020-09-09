import React, { useEffect, useState } from "react";

// import {
//   Readable,
//   Writable,
//   Transform,
//   Duplex,
//   pipeline,
//   finished,
// } from "readable-stream";

import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { exportToPDF } from "../utils/exportToPDF";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Grid,
  Tooltip,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import TheSidebar from "./TheSidebar";

import Table from "../../../share/component/Table.component";

import OrgStructureTreeAPI from "../../../api/cat_org_structure_tree.api";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  //   "& table": {
  //     "table-layout": "fixed",
  //   },
  //   height: "100vh",
  // },
  // paper: {
  //   padding: theme.spacing(1),
  //   height: "100vh",
  //   color: theme.palette.text.secondary,
  // },

  sidebar: {
    padding: "4px",
    height: "100vh",
    color: theme.palette.text.secondary,
  },
}));

const OrgStructurePage = (props) => {
  const classes = useStyles();

  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(1);
  const [Total, setTotal] = useState(0);

  const [ListProfile, setListProfile] = useState([]);

  const [OrgStructureSelected, setOrgStructureSelected] = useState(null);

  //const [StructureTree, setStructureTree] = useState(null);

   const [anchorEl, setAnchorEl] = useState(null);

   const handleClickExport = (event) => {
     setAnchorEl(event.currentTarget);
   };

   const exportPDF = () => {
     exportToPDF("Danh sach nhan vien", fields, ListProfile, "DSNhanVien");
     handleCloseExport();
   };

   const handleCloseExport = () => {
     setAnchorEl(null);
   };

  useEffect(() => {
    const onSearch = async () => {
      try {
        if (!OrgStructureSelected) return;
        setLoading(true);
        const result = await OrgStructureTreeAPI.getProfiles(
          OrgStructureSelected.ID,
          {
            filters: {
              StatusSyn: "E_HIRE",
            },
            fields: {
              CodeEmp: 1,
              ID: 1,
              ProfileName: 1,
              OrgStructureID: 1,
              OrgStructureName: 1,
              PositionID: 1,
              PositionName: 1,
            },
            page: CurrentPage,
          }
        );
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
        throw error;
      }
    };
    onSearch();
  }, [OrgStructureSelected, CurrentPage]);

  const onSelectOrgStructure = (OrgStructureID) => {
    setOrgStructureSelected(OrgStructureID);
    setCurrentPage(1);
  };
  //console.log("ListProfile",ListProfile)
  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={4} lg={3}>
        <Paper className={classes.sidebar}>
          <TheSidebar
            setOrgStructureSelected={onSelectOrgStructure}
            OrgStructureSelected={OrgStructureSelected}
          />
        </Paper>
      </Grid>

      <Grid item xs={8} lg={9}>
        {
          <Grid item xs={12}>
            <Paper className={classes.tool}>
              <Tooltip title="Export">
                <IconButton onClick={handleClickExport}>
                  <SaveAltIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseExport}
              >
                <MenuItem>
                  <CSVLink
                    data={ListProfile}
                    headers={fields}
                    filename={"DSNhanVien.csv"}
                  >
                    Export as CSV
                </CSVLink>
                </MenuItem>
                <MenuItem onClick={exportPDF}>Export as PDF</MenuItem>
              </Menu>
            </Paper>
          </Grid>
        }
        <Grid item xs={12}>
          <Paper className={classes.paper}>
       { //   <IconButton onClick={handleClickExport}>
        //   <Tooltip title="Export">
        //     <SaveAltIcon />
        //     </Tooltip>
        //   </IconButton>
        //   <Menu
        //   id="fade-menu"
        //   anchorEl={anchorEl}
        //   keepMounted
        //   open={ Boolean(anchorEl)}
        //   onClose={handleCloseExport}
        //  // TransitionComponent={Fade}
        // >
        //   <MenuItem onClick={handleCloseExport}>
        //     <CSVLink
        //       data={ListProfile}
        //       headers={fields}
        //       filename={"DsHopdong.csv"}
        //     >
        //     CSV
        //     </CSVLink>
        //   </MenuItem>
        //   <MenuItem onClick={handleCloseExport}>PDF</MenuItem>
        // </Menu>
      }
            <Table
              items={ListProfile}
              fields={fields}
              currentPage={CurrentPage}
              onPageChange={(i) => {
                setCurrentPage(i);
              }}
              isLoading={Loading}
              perPage={PerPage}
              totalDocuments={Total}
              scopedSlots={{
                ProfileName: (item) => {
                  return (
                    <td>
                      {!item.ProfileName ? (
                        ""
                      ) : (
                        <Tooltip title="Xem chi tiết">
                          <Link
                            to={{
                              pathname: `/nhan-su/chi-tiet-nhan-vien/${item.ID}`,
                              state: { from: props.location },
                            }}
                          >
                            {item.ProfileName}
                          </Link>
                        </Tooltip>
                      )}
                    </td>
                  );
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrgStructurePage;

const fields = [
  { _style: { width: "120px" }, key: "CodeEmp", label: "Mã nhân viên" },
  { _style: { width: "230px" }, key: "ProfileName", label: "Tên nhân viên" },
  {
    _style: { width: "300px" },
    key: "OrgStructureName",

    label: "Phòng ban",
  },
  { _style: { width: "200px" }, key: "PositionName", label: "Chức vụ" },
];
