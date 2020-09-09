import React, { useState, useEffect } from "react";

import { Autocomplete } from "@material-ui/lab";

import {
  FormControl,
  Grid,MenuItem,
  TextField,
  makeStyles,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import OrgStructureAPI from "../../../callAPI/Cat_OrgStructure.api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    //padding: theme.spacing(1),
  },
  date: {
    width: theme.spacing(24),
    marginRight: theme.spacing(2),
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const { Filter, setFilter } = props;

  const [ListOrgStructure, setListOrgStructure] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await OrgStructureAPI.getListOrgStructure();
      setListOrgStructure(res.data);
    };
    fetchAPI();
  }, []);
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
              if ("" !== event.target.value.trim())
                return setFilter({
                  ...Filter,
                  ...{ ProfileName: event.target.value },
                });
              const { ProfileName, ...FilterNew } = Filter;
              setFilter(FilterNew);
            }}
            placeholder="Vui lòng nhập"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          Trạng thái
          <TextField
            select
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
           // placeholder="Vui lòng nhập"
            variant="outlined"
            size="small"
            fullWidth
          >
          {StatusValue.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        </Grid>

      </Grid>

      <Grid className={classes.paper} container spacing={2}>
        <Grid item xs={3}>
          Phòng ban
          {
            <Autocomplete
              filterSelectedOptions
              multiple
              limitTags={1}
              defaultValue={[]}
              options={ListOrgStructure}
              getOptionLabel={(option) =>
                `${option.OrgStructureName}-${option.Code}`
              }
              getOptionSelected={(option, value) => option.ID === value.ID}
              renderInput={(params) => (
                <TextField {...params} size="small" variant="outlined" />
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

        <Grid item xs={3}>
        Tình trạng
        <TextField
          select
          value={!Filter.Accept ? "" : Filter.Accept}
          onChange={(event) => {
            if ("" !== event.target.value.trim())
              return setFilter({
                ...Filter,
                ...{ Accept: event.target.value.trim() },
              });
            const { Accept, ...FilterNew } = Filter;
            setFilter(FilterNew);
          }}
         // placeholder="Vui lòng nhập"
          variant="outlined"
          size="small"
          fullWidth
        >
        {AcceptValue.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>
      </Grid>
      {
        //<Grid className={classes.paper} container spacing={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={5}>
              <FormControl fullWidth>
                Ngày đi công tác
                <div style={{ paddingTop: "8px" }}>
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    clearable
                    label="Từ ngày"
                    size="small"
                    fullWidth={false}
                    className={classes.date}
                    format="dd/MM/yyyy"
                    value={
                      !Filter.DateHire
                        ? null
                        : !Filter.DateHire["$gt"]
                        ? null
                        : Filter.DateHire["$gt"]
                    }
                    maxDate={
                      !Filter.DateHire
                        ? new Date()
                        : !Filter.DateHire["$lte"]
                        ? new Date()
                        : Filter.DateHire["$lte"]
                    }
                    onChange={(date) => {
                      if (null !== date)
                        return setFilter({
                          ...Filter,
                          ...{ DateHire: { ...Filter.DateHire, $gt: date } },
                        });
                      if (!Filter.DateHire) {
                        const { DateHire, ...FilterNew } = Filter;
                        return setFilter(FilterNew);
                      }
                      const { $gt, ...DateHireNew } = Filter.DateHire;
                      setFilter({ ...Filter, DateHire: DateHireNew });
                    }}
                  />
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    clearable
                    size="small"
                    fullWidth={false}
                    className={classes.date}
                    minDate={
                      !Filter.DateHire
                        ? 0
                        : !Filter.DateHire["$gt"]
                        ? 0
                        : Filter.DateHire["$gt"]
                    }
                    maxDate={new Date()}
                    label="Đến ngày"
                    format="dd/MM/yyyy"
                    value={
                      !Filter.DateHire
                        ? null
                        : !Filter.DateHire["$lte"]
                        ? null
                        : Filter.DateHire["$lte"]
                    }
                    onChange={(date) => {
                      if (null !== date)
                        return setFilter({
                          ...Filter,
                          ...{ DateHire: { ...Filter.DateHire, $lte: date } },
                        });
                      if (!Filter.DateHire) {
                        const { DateHire, ...FilterNew } = Filter;
                        return setFilter(FilterNew);
                      }
                      const { $lte, ...DateHireNew } = Filter.DateHire;
                      setFilter({ ...Filter, DateHire: DateHireNew });
                    }}
                  />
                </div>
              </FormControl>
            </Grid>
          </MuiPickersUtilsProvider>
        //</Grid>
      }</Grid>
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
    value: "Khen thưởng",
    label: "Khen thưởng",
  },
  {
    value: "Kỉ luật",
    label: "Kỉ luật",
  },
  {
    value: "Đang công tác",
    label: "Đang công tác",
  },
  {
    value: "Chuẩn bị công tác",
    label: "Chuẩn bị công tác",
  }
];

const AcceptValue = [
  {
    value: "",
    label: "None",
  },
  {
    value: "Đã duyệt",
    label: "Đã duyệt",
  },
  {
    value: "Chưa duyệt",
    label: "Chưa duyệt",
  }
];
