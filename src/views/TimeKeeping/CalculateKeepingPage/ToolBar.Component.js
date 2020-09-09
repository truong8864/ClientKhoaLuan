import React from "react";

import { Toolbar, makeStyles, Chip } from "@material-ui/core";

import FilterListSharpIcon from "@material-ui/icons/FilterListSharp";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "4px",
    paddingRight: "4px",
  },
  left: {
    flexGrow: 1,
    display: "flex",
  },
  search: {
    marginRight: theme.spacing(3),
  },
  right: {
    display: "flex",
  },
  setting: {
    marginLeft: theme.spacing(5),
  },
}));

const ToolBar = (props) => {
  const classes = useStyles();

  const { TongHopCong } = props;

  return (
    <Toolbar variant="dense" disableGutters className={classes.root}>
      <div className={classes.left}>
        <Chip
          icon={<FilterListSharpIcon />}
          label="TỔNG HỢP CÔNG"
          clickable
          className={classes.search}
          onClick={TongHopCong}
          color="primary"
        />
      </div>

      <div className={classes.right}>
        <div></div>
        <div className={classes.setting}></div>
      </div>
    </Toolbar>
  );
};
export default ToolBar;
