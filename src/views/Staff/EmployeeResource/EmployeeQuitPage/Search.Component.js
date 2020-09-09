import React, { useContext } from "react";

import {
  MenuItem,
  FormControl,
  Grid,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import AutocompleteCover from "../../../../share/component/AutoCompleteCover.Component";

import CategoryContext from "../../../../containers/CategoryContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    //padding: theme.spacing(1),
  },
  date: {
    width: "49%",
    marginRight: "1%",
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
            placeholder="Vui lòng nhập"
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
              setFilter({
                ...Filter,
                ...{ ProfileName: event.target.value },
              });
            }}
            placeholder="Vui lòng nhập"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          Số CMND
          <TextField
            value={!Filter.IDNo1 ? "" : Filter.IDNo1}
            onChange={(event) => {
              if ("" !== event.target.value.trim())
                return setFilter({
                  ...Filter,
                  ...{ IDNo1: event.target.value.trim() },
                });
              const { IDNo1, ...FilterNew } = Filter;
              setFilter(FilterNew);
            }}
            placeholder="Vui lòng nhập"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          Phòng ban
          {
            <AutocompleteCover
              filterSelectedOptions
              multiple
              limitTags={1}
              defaultValue={[]}
              options={Category.ListOrgStructure}
              getOptionLabel={(option) =>
                `${option.OrgStructureName}-${option.Code}`
              }
              getOptionSelected={(option, value) => option.ID === value.ID}
              renderInput={(params) => (
                <TextField {...params} size="small" variant="outlined" />
              )}
              renderOption={(option) => (
                <Typography>{`${option.Code} - ${option.OrgStructureName}`}</Typography>
              )}
              onChange={(event, item) => {
                if (0 < item.length) {
                  return setFilter({
                    ...Filter,
                    ...{ OrgStructureID: { $in: item.map((i) => i.ID) } },
                  });
                }
                const { OrgStructureID, ...FilterNew } = Filter;
                setFilter(FilterNew);
              }}
            />
          }
        </Grid>
      </Grid>
      <Grid className={classes.paper} container spacing={2}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={5}>
            <FormControl fullWidth>
              Ngày nghỉ việc
              <div>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  clearable
                  label="Từ ngày"
                  size="small"
                  fullWidth={false}
                  className={classes.date}
                  format="dd/MM/yyyy"
                  value={
                    !Filter.DateStop
                      ? null
                      : !Filter.DateStop["$gte"]
                      ? null
                      : Filter.DateStop["$gte"]
                  }
                  maxDate={
                    !Filter.DateStop
                      ? new Date("01/01/2100")
                      : !Filter.DateStop["$lte"]
                      ? new Date()
                      : Filter.DateStop["$lte"]
                  }
                  onChange={(date) => {
                    if (null !== date)
                      return setFilter({
                        ...Filter,
                        ...{ DateStop: { ...Filter.DateStop, $gte: date } },
                      });
                    if (!Filter.DateStop) {
                      const { DateStop, ...FilterNew } = Filter;
                      return setFilter(FilterNew);
                    }
                    const { $gte, ...DateStopNew } = Filter.DateStop;
                    setFilter({ ...Filter, DateStop: DateStopNew });
                  }}
                />
                <KeyboardDatePicker
                  inputVariant="outlined"
                  clearable
                  size="small"
                  fullWidth={false}
                  className={classes.date}
                  minDate={
                    !Filter.DateStop
                      ? 0
                      : !Filter.DateStop["$gte"]
                      ? 0
                      : Filter.DateStop["$gte"]
                  }
                  label="Đến ngày"
                  format="dd/MM/yyyy"
                  value={
                    !Filter.DateStop
                      ? null
                      : !Filter.DateStop["$lte"]
                      ? null
                      : Filter.DateStop["$lte"]
                  }
                  onChange={(date) => {
                    if (null !== date)
                      return setFilter({
                        ...Filter,
                        ...{ DateStop: { ...Filter.DateStop, $lte: date } },
                      });
                    if (!Filter.DateStop) {
                      const { DateStop, ...FilterNew } = Filter;
                      return setFilter(FilterNew);
                    }
                    const { $lte, ...DateStopNew } = Filter.DateStop;
                    setFilter({ ...Filter, DateStop: DateStopNew });
                  }}
                />
              </div>
            </FormControl>
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid item xs={3}>
          <FormControl fullWidth>
            Trạng thái
            {
              <TextField
                value={!Filter.Status ? "" : Filter.Status}
                onChange={(event) => {
                  if ("" !== event.target.value.trim())
                    return setFilter({
                      ...Filter,
                      ...{ Status: event.target.value.trim() },
                    });
                  const { Status, ...FilterNew } = Filter;
                  setFilter(FilterNew);
                }}
                variant="outlined"
                size="small"
                select
              >
                {StatusValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            }
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;

const StatusValue = [
  {
    value: "",
    label: "None",
  },
  {
    value: "E_CANCEL",
    label: "Đã hủy",
  },
  {
    value: "E_APPROVED",
    label: "Đã duyệt",
  },
  {
    value: "E_WAITING",
    label: "Chờ duyệt",
  },
];
