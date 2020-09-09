import React, { useContext } from "react";

import {
  Button,
  makeStyles,
  Typography,
  LinearProgress,
} from "@material-ui/core";

import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import StyledTreeItem from "./StyledTreeItem";

import CategoryContext from "../../../containers/CategoryContext";

const useStyles = makeStyles({
  title: {
    fontWeight: 600,
    color: "#46546c",
  },
});

const OrgStructureTree = (props) => {
  const classes = useStyles();
  const { setOrgStructureSelected, OrgStructureSelected } = props;

  const Category = useContext(CategoryContext);

  const renderTree = (nodes) =>
    !nodes ? (
      <LinearProgress />
    ) : (
      <StyledTreeItem
        key={nodes.ID}
        nodeId={nodes.ID}
        labelText={`${nodes.Code}-${nodes.OrgStructureName}`}
        labelIcon={nodes.children ? PeopleAltIcon : PersonOutlineIcon}
        color="#a250f5"
        bgColor="#f3e8fd"
        labelInfo="100"
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </StyledTreeItem>
    );

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultExpanded={["2D51E4D9-0E27-451F-83D8-04DA7D6B9797"]}
      selected={[!OrgStructureSelected ? null : OrgStructureSelected.ID]}
      onNodeSelect={(event, item) => {
        const OrgStructureSelect = Category.ListOrgStructure.find(
          (Org) => Org.ID === item
        );
        setOrgStructureSelected(OrgStructureSelect);
      }}
    >
      <Button
        variant="outlined"
        startIcon={<AccountTreeIcon color="action" />}
        disabled
        fullWidth
      >
        <Typography className={classes.title}>Sơ đồ tổ chức</Typography>
      </Button>

      {renderTree(Category.OrgStructureTree)}
    </TreeView>
  );
};

export default OrgStructureTree;
