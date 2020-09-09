import React from "react";
import {
  Toolbar,
  Tooltip,
  IconButton,
  makeStyles,
  Chip,
  Typography,
  Button,
} from "@material-ui/core";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SearchIcon from "@material-ui/icons/Search";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import {
  DeleteNewStaffApi,
  DeleteAllNewStaffApi,
} from "../../../../callAPI/NewStaff.api";
import { CForm } from "@coreui/react";
import { CSVLink } from "react-csv";

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
  const { onSearch, RowSelected, setshowNewProfile, setShowFile,data,fields} = props;
  //console.log("ListProfile toll",ListProfile)
  const DeleteNewStaff = async (value) => {
    try {
      let i = value.length;
      while (i > 0) {
        console.log("value[i-1]._id", value[i - 1]._id);
        await DeleteNewStaffApi(value[i - 1]._id);
        i--;
      }
      alert("Duyệt hành công");
    } catch (error) {
      console.log("duyệt nhân viên mới lỗi", error);
    }
  };
  const DeleteAllNewStaff = async () => {
    const res = await DeleteAllNewStaffApi();
    if (res) {
      alert("Duyệt thành công");
    }
  };

  return (
    <Toolbar variant="dense" disableGutters className={classes.root}>
      <div className={classes.left}>
        <Chip
          icon={<SearchIcon />}
          label="Tìm kiếm"
          clickable
          className={classes.search}
          onClick={onSearch}
          color="primary"
        />
        <Typography variant="h6" component="h2">
          {
            /*RowSelected?RowSelected.ProfileName:null*/ RowSelected.length > 0
              ? `${RowSelected.length} dòng đã chọn`
              : null
          }
        </Typography>
      </div>

      <CForm onSubmit={onSearch} className={classes.right}>
        <div>
          {RowSelected.length !== 0 ? (
            <Button onClick={() => {
              DeleteNewStaff(RowSelected);
            }}
              disabled={RowSelected.length === 0 ? true : false}
              color="primary"
            >
              <Tooltip title="Duyệt">
                <PlaylistAddCheckOutlinedIcon />
              </Tooltip>
              Duyệt
            </Button>
          ) : (
            <Button onClick={DeleteAllNewStaff} type="submit" color="primary">
              <Tooltip title="Duyệt tất cả">
                <PlaylistAddCheckOutlinedIcon />
              </Tooltip>
              Duyệt tất cả
            </Button>
          )}
          <IconButton onClick={() => setshowNewProfile(true)}>
            <Tooltip title="Thêm hồ sơ">
              <NoteAddIcon />
            </Tooltip>
          </IconButton>

          <Button onClick={() => setShowFile(true)} color="primary">
            <Tooltip title="Thêm nhân viên bằng file">
              <NoteAddIcon />
            </Tooltip>
            Thêm File
          </Button>

          <IconButton
            onClick={() => {
              DeleteNewStaff(RowSelected);
            }} //disabled={JSON.stringify(RowSelected)===JSON.stringify({})?true:false}
            disabled={RowSelected.length === 0 ? true : false}
          >
            <Tooltip title="Xóa hồ sơ">
              <DeleteOutlineIcon />
            </Tooltip>
          </IconButton>
        </div>
        <div className={classes.setting}>

        <IconButton>
        <Tooltip title="Export">
          <CSVLink
          headers={fields}
          data={data}
          filename={"danh-sach-tiep-nhan.csv"}
        >
          <SaveAltIcon />
        </CSVLink>
          </Tooltip>
        </IconButton>

          <IconButton>
            <Tooltip title="Cài đặt hiển thị">
              <SettingsIcon />
            </Tooltip>
          </IconButton>
        </div>
      </CForm>
    </Toolbar>
  );
};
export default ToolBar;
