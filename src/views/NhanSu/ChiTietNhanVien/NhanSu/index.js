import React, { useState }  from "react";



import { AppBar, Tabs, Tab } from "@material-ui/core";

import TabPanel from "../TabPanel";


import { makeStyles } from "@material-ui/core/styles";
import ThongTinNhanVien from "./ThongTinNhanVien";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


  
 
const NhanSu = (props) => {
  const classes = useStyles();

  const [OptionSelected, setOptionSelected] = useState("thong-tin-nhan-vien")

  const handleChange=(event,value)=>{
    setOptionSelected(value)
  }

  return (
    <div  className={classes.root}>
        <AppBar variant="outlined" position="static" color="default">
        <Tabs
        value={OptionSelected}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
      >
        <Tab label="Thông tin nhân viên"  value="thong-tin-nhan-vien"/>
        <Tab label="Liên hệ" value="lien-he"/>
        <Tab label="Người thân" value="nguoi-than" />
        <Tab label="Trình độ chuyên môn" value="trinh-do-chuyen-mon"/>
      </Tabs>
        </AppBar>
        <TabPanel value={OptionSelected} index={"thong-tin-nhan-vien"}>
          <ThongTinNhanVien/>
      </TabPanel>
      <TabPanel value={OptionSelected} index={"lien-he"}>
      Liên hệ
      </TabPanel>
      <TabPanel value={OptionSelected} index={"nguoi-than"}>
    Người thân
      </TabPanel>
      <TabPanel value={OptionSelected} index={"trinh-do-chuyen-mon"}>
      Trình độ chuyên môn
      </TabPanel>
      </div>
    )
}

export default NhanSu;
