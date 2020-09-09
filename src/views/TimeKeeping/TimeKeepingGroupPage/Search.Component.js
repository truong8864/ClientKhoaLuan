import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Grid, TextField, Typography } from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import AutocompleteCover from "../../../share/component/AutoCompleteCover.Component";

import CategoryContext from "../../../containers/CategoryContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(1),
    //textAlign: "center",
  },
}));

const Search = (props) => {
  const classes = useStyles();

  const { Filter, setFilter } = props;
  const Category = useContext(CategoryContext);

  return (
    <Grid className={classes.root} container spacing={1}>
      <Grid className={classes.paper} container spacing={2}>
        <Grid item xs={3}>
          Mã nhân viên
          <TextField
            value={!Filter.CodeEmp ? "" : Filter.CodeEmp}
            onChange={(event) => {
              if ("" !== event.target.value.trim())
                return setFilter({
                  ...Filter,
                  ...{ CodeEmp: event.target.value.trim() },
                });
              const { CodeEmp, ...FilterNew } = Filter;
              setFilter(FilterNew);
            }}
            placeholder="Vui lòng nhập"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          Tên nhân viên
          <TextField
            value={!Filter.ProfileName ? "" : Filter.ProfileName}
            onChange={(event) => {
              if ("" !== event.target.value.trim())
                return setFilter({
                  ...Filter,
                  ...{ ProfileName: event.target.value.trim() },
                });
              const { ProfileName, ...FilterNew } = Filter;
              setFilter(FilterNew);
            }}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          Phòng ban
          {
            <AutocompleteCover
              options={Category.ListOrgStructure}
              onChange={(event, item) => {
                if (item)
                  return setFilter({
                    ...Filter,
                    ...{ OrgStructureID: item.ID },
                  });
                const { OrgStructureID, ...FilterNew } = Filter;
                setFilter(FilterNew);
              }}
              getOptionLabel={(option) =>
                `${option.OrgStructureName}-${option.Code}`
              }
              renderOption={(option) => (
                <Typography>{`${option.Code} - ${option.OrgStructureName}`}</Typography>
              )}
              renderInput={(params) => (
                <TextField {...params} size="small" variant="outlined" />
              )}
            />
          }
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            Kì công
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  clearable
                  size="small"
                  fullWidth={false}
                  emptyLabel="__/____"
                  views={["year", "month"]}
                  format="MM/yyyy"
                  value={!Filter.KiCong ? null : Filter.KiCong}
                  onChange={(date) => {
                    if (date)
                      return setFilter({
                        ...Filter,
                        ...{ KiCong: date },
                      });
                    const { KiCong, ...FilterNew } = Filter;
                    setFilter(FilterNew);
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;
