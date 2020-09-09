import React, { useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputFile,
  CDataTable,
} from "@coreui/react";
//import ArchiveIcon from '@material-ui/icons/Archive';
import { Grid, makeStyles, Button, Paper } from "@material-ui/core";

import { CSVLink } from "react-csv";

import { csv } from "d3";

import DayKeepingAPI from "../../../api/att_day_keeping.api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    width: "100%",
  },
  file: {
    display: "flex",
  },
  choosefile: {
    flexGrow: 1,
    "& .form-control-file": {
      border: "1px solid #e4e7ea",
      "border-radius": ".25rem",
    },
    paddingRight: theme.spacing(1),
  },
  downfile: {},
}));

const FileUpload = (props) => {
  const classes = useStyles();
  const { showFileUpload, setshowFileUpload } = props;
  const [DataImport, setDataImport] = useState(null);

  const handleOnchange = async (event) => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const data = await csv(e.target.result);
      setDataImport(data);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  console.log("Data:", DataImport ? DataImport : "KO CO J");

  const onUpload = async (event) => {
    let i = 0;
    while (i <= DataImport.length) {
      const DataUpload = DataImport.slice(i, i + 1000);
      await DayKeepingAPI.uploadData({ data: DataUpload });
      i = i + 1000;
    }
    alert("Đã tải lên");
  };

  return (
    <CModal
      size="lg"
      show={showFileUpload}
      onClose={() => setshowFileUpload(false)}
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>Tải lên</CModalHeader>
      <CModalBody className={classes.root}>
        <Grid>
          <Paper className={classes.paper} variant="outlined">
            <div className={classes.file}>
              <div className={classes.choosefile}>
                <CInputFile
                  type="file"
                  accept=".csv"
                  onChange={handleOnchange}
                />
              </div>
              <div className={classes.downfile}>
                <CSVLink
                  headers={headers}
                  data={[]}
                  filename={"cham-cong.csv"}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Tải file mẫu
                </CSVLink>

                {
                  //    <Chip
                  //    icon={<ArchiveIcon />}
                  //    label="TAI FILE MAU"
                  //    clickable
                  //    color="primary"
                  // />
                }
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid>
          <Paper>
            <CDataTable
              fields={DataImport ? DataImport.columns : []}
              pagination
              itemsPerPage={15}
              items={DataImport}
            />
          </Paper>
        </Grid>
      </CModalBody>
      <CModalFooter>
        <Button
          disabled={DataImport ? false : true}
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
          onClick={onUpload}
        >
          Tải lên
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setshowFileUpload(false)}
        >
          Thoát
        </Button>
      </CModalFooter>
    </CModal>
  );
};

export default FileUpload;

const headers = [
  { label: "ProfileID", key: "ProfileID" },
  { label: "ProfileName", key: "ProfileName" },
  { label: "DateKeeping", key: "DateKeeping" },
  { label: "TimeIn", key: "TimeIn" },
  { label: "TimeOut", key: "TimeOut" },
];
