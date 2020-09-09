import React, { useState, useContext } from "react";

import { Paper, makeStyles, TextField, Typography } from "@material-ui/core";

import { CSidebarNav } from "@coreui/react";

import AutocompleteCover from "../../../share/component/AutoCompleteCover.Component";

import OrgStructureTree from "./OrgStructureTree";

import CategoryContext from "../../../containers/CategoryContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "99vh",
    fontWeight: 500,
  },
  search: {
    marginTop: theme.spacing(1),
  },
}));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const TheSidebar = (props) => {
  const classes = useStyles();

  const { setOrgStructureSelected, OrgStructureSelected } = props;

  const [loading, setLoading] = useState(false);

  const Category = useContext(CategoryContext);

  return (
    <Paper variant="outlined" className={classes.root}>
      <CSidebarNav>
        <AutocompleteCover
          className={classes.search}
          loading={loading}
          onInputChange={async (event, value) => {
            if (!value) return;
            setLoading(true);
            await sleep(500);
            setLoading(false);
          }}
          elevation={0}
          disableClearable
          filterSelectedOptions
          autoHighlight
          value={OrgStructureSelected}
          options={Category.ListOrgStructure}
          getOptionLabel={(option) =>
            `${option.OrgStructureName} - ${option.Code}`
          }
          getOptionSelected={(option, value) => {
            return option.ID === value.ID;
          }}
          onChange={(event, item) => {
            setOrgStructureSelected(item);
          }}
          fullWidth
          size="small"
          renderOption={(option) => (
            <Typography>{`${option.Code} - ${option.OrgStructureName}`}</Typography>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tìm kiếm phòng ban"
              variant="outlined"
            />
          )}
        />
        <OrgStructureTree
          OrgStructureSelected={OrgStructureSelected}
          setOrgStructureSelected={setOrgStructureSelected}
        />
      </CSidebarNav>
    </Paper>
  );
};

export default TheSidebar;
