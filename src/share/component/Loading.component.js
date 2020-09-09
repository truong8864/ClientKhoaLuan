import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    position: "absolute",
    "background- color": "#ffffff66",
  },
  main: {
    "margin-top": "70px",
    color: "#3b4452",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={`text-center ${classes.main}`}>
        <h2>
          {"Đang tải dữ liệu"}
          <CircularProgress />
        </h2>
      </div>
    </div>
  );
};

export default Loading;
