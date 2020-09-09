import React, { useEffect, useState } from "react";

import OrgStructureAPI from "../../../../callAPI/Cat_OrgStructure.api";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, FormControl } from "@material-ui/core";

//import Autocomplete from "@material-ui/lab/Autocomplete";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

const getListOrg = (Tree, listOrg = []) => {
  if (null === Tree) return listOrg;
  if (!Tree.children) {
    listOrg.push({
      ID: Tree.data.ID,
      Code: Tree.data.Code,
      OrgStructureName: Tree.data.OrgStructureName,
    });
    return listOrg;
  }
  Tree.children.forEach((item) => {
    getListOrg(item, listOrg);
  });
  return listOrg;
};

const Search = (props) => {
  const [OrgStructure, setOrgStructure] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await OrgStructureAPI.getStructureTree();
      const listOrg = getListOrg(result.data);
      setOrgStructure(listOrg);
    };
    fetchAPI();
  }, []);
  const classes = useStyles();

  const {
    Filter, setFilter,
  } = props;

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
        <Autocomplete
          options={OrgStructure}
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
         Ngày bắt đầu
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
               !Filter.DateStart
                 ? null
                 : !Filter.DateStart["$gte"]
                 ? null
                 : Filter.DateStart["$gte"]
             }
             maxDate={
               !Filter.DateStart
                 ? new Date(Date.now()+1000*60*60*24*30)
                 : !Filter.DateStart["$lte"]
                 ? new Date()
                 : Filter.DateStart["$lte"]
             }
             onChange={(date) => {
               if (null !== date)
                 return setFilter({
                   ...Filter,
                   ...{ DateStart: { ...Filter.DateStart, $gte: date } },
                 });
               if (!Filter.DateStart) {
                 const { DateStart, ...FilterNew } = Filter;
                 return setFilter(FilterNew);
               }
               const { $gte, ...DateStartNew } = Filter.DateStart;
               setFilter({ ...Filter, DateStart: DateStartNew });
             }}
           />
           <KeyboardDatePicker
             inputVariant="outlined"
             clearable
             size="small"
             fullWidth={false}
             className={classes.date}
             minDate={
               !Filter.DateStart
                 ? 0
                 : !Filter.DateStart["$gte"]
                 ? 0
                 : Filter.DateStart["$gte"]
             }
             maxDate={new Date(Date.now()+1000*60*60*24*30)}
             label="Đến ngày"
             format="dd/MM/yyyy"
             value={
               !Filter.DateStart
                 ? null
                 : !Filter.DateStart["$lte"]
                 ? null
                 : Filter.DateStart["$lte"]
             }
             onChange={(date) => {
               if (null !== date)
                 return setFilter({
                   ...Filter,
                   ...{ DateStart: { ...Filter.DateStart, $lte: date } },
                 });
               if (!Filter.DateStart) {
                 const { DateStart, ...FilterNew } = Filter;
                 return setFilter(FilterNew);
               }
               const { $lte, ...DateStartNew } = Filter.DateStart;
               setFilter({ ...Filter, DateStart: DateStartNew });
             }}
           />
         </div>
       </FormControl>
     </Grid>
     <Grid item xs={5}>
       <FormControl fullWidth>
         Ngày kết thúc
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
               !Filter.DateEnd
                 ? null
                 : !Filter.DateEnd["$gte"]
                 ? null
                 : Filter.DateEnd["$gte"]
             }
             maxDate={
               !Filter.DateEnd
                 ? new Date(Date.now()+1000*60*60*24*365*3)
                 : !Filter.DateEnd["$lte"]
                 ? new Date()
                 : Filter.DateEnd["$lte"]
             }
             onChange={(date) => {
               if (null !== date)
                 return setFilter({
                   ...Filter,
                   ...{ DateEnd: { ...Filter.DateEnd, $gte: date } },
                 });
               if (!Filter.DateEnd) {
                 const { DateEnd, ...FilterNew } = Filter;
                 return setFilter(FilterNew);
               }
               const { $gte, ...DateEndNew } = Filter.DateEnd;
               setFilter({ ...Filter, DateEnd: DateEndNew });
             }}
           />
           <KeyboardDatePicker
             inputVariant="outlined"
             clearable
             size="small"
             fullWidth={false}
             className={classes.date}
             minDate={
               !Filter.DateEnd
                 ? 0
                 : !Filter.DateEnd["$gte"]
                 ? 0
                 : Filter.DateEnd["$gte"]
             }
             maxDate={Date.now()+1000*60*60*24*365*3}
             label="Đến ngày"
             format="dd/MM/yyyy"
             value={
               !Filter.DateEnd
                 ? null
                 : !Filter.DateEnd["$lte"]
                 ? null
                 : Filter.DateEnd["$lte"]
             }
             onChange={(date) => {
               if (null !== date)
                 return setFilter({
                   ...Filter,
                   ...{ DateEnd: { ...Filter.DateEnd, $lte: date } },
                 });
               if (!Filter.DateEnd) {
                 const { DateEnd, ...FilterNew } = Filter;
                 return setFilter(FilterNew);
               }
               const { $lte, ...DateEndNew } = Filter.DateEnd;
               setFilter({ ...Filter, DateEnd: DateEndNew });
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
    value: "E_APPROVED",
    label: "Đã duyệt",
  },
  {
    value: "E_WAITING",
    label: "Chưa duyệt",
  },
];
