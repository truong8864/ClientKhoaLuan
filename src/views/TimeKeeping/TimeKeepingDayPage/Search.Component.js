import React, { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  FormControl,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import AutocompleteCover from "../../../share/component/AutoCompleteCover.Component";

import CategoryContext from "../../../containers/CategoryContext";
import ProfileAPI from "../../../callAPI/Profile.api"

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
  date: {
    width: theme.spacing(24),
    marginRight: theme.spacing(2),
  },
}));

const Search = (props) => {
  const classes = useStyles();

  const { Filter, setFilter } = props;
  const [Err, setErr] = useState({})
  const [Profile, setProfile] = useState({})

  const Category = useContext(CategoryContext);

  return (
    <Grid className={classes.root} container spacing={1}>
      <Grid className={classes.paper} container spacing={2}>
        <Grid item xs={3}>
          Mã nhân viên
          <TextField
            value={!Filter.CodeEmp ? "" : Filter.CodeEmp}
            error={!Err.CodeEmp?false:true}
            onBlur={ async()=>{
              if(!Filter.CodeEmp)
              {
                return setErr({...Err,CodeEmp:"Chưa nhập mã nhân viên"})
              }
              const data = await ProfileAPI.getProfilesbyCodeEmp(Filter.CodeEmp)
              if(1!==data.data.length){
                return setErr({...Err,CodeEmp:"Mã nhân viên không chính xác"})
              }
              setErr({...Err,CodeEmp:null})
              setProfile({...Profile,ProfileName:data.data[0].ProfileName})
          }}

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
            value={!Profile.ProfileName ? "" : Profile.ProfileName}
            disabled
            // onChange={(event) => {
            //   if ("" !== event.target.value.trim())
            //     return setFilter({
            //       ...Filter,
            //       ...{ ProfileName: event.target.value.trim() },
            //     });
            //   const { ProfileName, ...FilterNew } = Filter;
            //   setFilter(FilterNew);
            // }}
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
            Trạng thái
            {
              <TextField
                size="small"
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
                variant="outlined"
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

      <Grid className={classes.paper} container spacing={2}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={5}>
            <FormControl fullWidth>
              Dữ liệu chấm công
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
                    !Filter.DateKeeping
                      ? null
                      : !Filter.DateKeeping["$gte"]
                      ? null
                      : Filter.DateKeeping["$gte"]
                  }
                  maxDate={
                    !Filter.DateKeeping
                      ? new Date()
                      : !Filter.DateKeeping["$lte"]
                      ? new Date()
                      : Filter.DateKeeping["$lte"]
                  }
                  onChange={(date) => {
                    if (null !== date)
                      return setFilter({
                        ...Filter,
                        ...{
                          DateKeeping: { ...Filter.DateKeeping, $gte: date },
                        },
                      });
                    if (!Filter.DateKeeping) {
                      const { DateKeeping, ...FilterNew } = Filter;
                      return setFilter(FilterNew);
                    }
                    const { $gte, ...DateKeepingNew } = Filter.DateKeeping;
                    setFilter({ ...Filter, DateKeeping: DateKeepingNew });
                  }}
                />
                <KeyboardDatePicker
                  inputVariant="outlined"
                  clearable
                  size="small"
                  fullWidth={false}
                  className={classes.date}
                  minDate={
                    !Filter.DateKeeping
                      ? 0
                      : !Filter.DateKeeping["$gte"]
                      ? 0
                      : Filter.DateKeeping["$gte"]
                  }
                  maxDate={new Date()}
                  label="Đến ngày"
                  format="dd/MM/yyyy"
                  value={
                    !Filter.DateKeeping
                      ? null
                      : !Filter.DateKeeping["$lte"]
                      ? null
                      : Filter.DateKeeping["$lte"]
                  }
                  onChange={(date) => {
                    if (null !== date)
                      return setFilter({
                        ...Filter,
                        ...{
                          DateKeeping: { ...Filter.DateKeeping, $lte: date },
                        },
                      });
                    if (!Filter.DateKeeping) {
                      const { DateKeeping, ...FilterNew } = Filter;
                      return setFilter(FilterNew);
                    }
                    const { $lte, ...DateKeepingNew } = Filter.DateKeeping;
                    setFilter({ ...Filter, DateKeeping: DateKeepingNew });
                  }}
                />
              </div>
            </FormControl>
          </Grid>
        </MuiPickersUtilsProvider>
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
    value: "DA_TINH_CONG",
    label: "Đã tính công",
  },
  {
    value: "CHUA_TINH_CONG",
    label: "Chưa tính công",
  },
];
