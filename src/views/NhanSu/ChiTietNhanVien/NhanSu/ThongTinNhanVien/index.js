import React, { useEffect, useState } from "react";

import { Grid, Paper } from "@material-ui/core";

import ToolBar from "./ToolBar"


import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {},
  toolbar: {},
  content: {
  },
}));

const ThongTinNhanVien = (props) => {
  const classes = useStyles();


  return (
    <Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.toolbar}><ToolBar/></Paper>
      </Grid>
      <Grid item>
        <Paper variant="outlined" className={classes.content}> <Content/> </Paper>
      </Grid>
    </Grid>
  );
};

export default ThongTinNhanVien;
