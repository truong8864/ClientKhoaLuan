import React, { useState }  from "react";



import { Paper, AppBar, Tabs, Tab } from "@material-ui/core";

import TabPanel from "./TabPanel";

import { makeStyles } from "@material-ui/core/styles";
import NhanSu from "./NhanSu";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


  
 
const ChiTietNhanVien = (props) => {
    const classes = useStyles();

    const [OptionSelected, setOptionSelected] = useState("nhan-su")

    const handleChange=(event,value)=>{
      setOptionSelected(value)
    }

  return (
    <Paper variant="outlined"  className={classes.root} >
        <AppBar variant="outlined" position="static" color="default">
        <Tabs
        value={OptionSelected}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
      >
        <Tab label="Nhân sự"  value="nhan-su"/>
        <Tab label="Hợp đồng & bảo hiểm" value="hop-dong-bao-hiem"/>
        <Tab label="Qúa trình công tác" value="qua-trinh-cong-tac" />
        <Tab label="Chấm công" value="cham-cong"/>
        <Tab label="Lương" value="luong" />
      </Tabs>
        </AppBar>
        <TabPanel value={OptionSelected} index={"nhan-su"}>
       <NhanSu/>
      </TabPanel>
      <TabPanel value={OptionSelected} index={"hop-dong-bao-hiem"}>
      Hợp đồng bảo hiểm
      </TabPanel>
      <TabPanel value={OptionSelected} index={"qua-trinh-cong-tac"}>
    Qúa trình công tác
      </TabPanel>
      <TabPanel value={OptionSelected} index={"cham-cong"}>
       Chấm công
      </TabPanel>
      <TabPanel value={OptionSelected} index={"luong"}>
        Lương
      </TabPanel>
     </Paper>
    )
}

export default ChiTietNhanVien;
