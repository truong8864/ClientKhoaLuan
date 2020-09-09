import React, { useState, useEffect } from "react";

import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

import { CategoryProvider } from "./CategoryContext";

import OrgStructureAPI from "../api/cat_org_structure.api";
import OrgStructureTreeAPI from "../api/cat_org_structure_tree.api";

import PositionAPI from "../api/cat_position.api";

import { makeStyles } from "@material-ui/core/styles";
import { CSubheader, CBreadcrumbRouter } from "@coreui/react";

import routes from "../routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& table": {
      "table-layout": "fixed",
    },
    "& th ": {
      padding: "7px",
    },
    "& td ": {
      padding: "7px",
    },
  },
}));

const TheLayout = (props) => {
  const classes = useStyles();

  const { IsLogged, setIsLogged } = props;

  const [ListOrgStructure, setListOrgStructure] = useState([]);
  const [OrgStructureTree, setOrgStructureTree] = useState(null);
  const [ListPosition, setListPosition] = useState([]);

  useEffect(() => {
    OrgStructureTreeAPI.getByRootID()
      .then((res) => {
        if (res.data) setOrgStructureTree(res.data.StructureTree);
      })
      .catch((err) => console.log(err));

    OrgStructureAPI.get({
      all: 1,
      fields: {
        ID: 1,
        Code: 1,
        OrgStructureName: 1,
      },
    })
      .then((res) => {
        setListOrgStructure(res.data);
      })
      .catch((err) => console.log(err));

    PositionAPI.get({
      all: 1,
      fields: {
        ID: 1,
        Code: 1,
        PositionName: 1,
      },
    })
      .then((res) => {
        setListPosition(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CategoryProvider
      value={{
        ListOrgStructure: ListOrgStructure,
        OrgStructureTree: OrgStructureTree,
        ListPosition: ListPosition,
      }}
    >
      <div className={`c-app c-default-layout ${classes.root}`}>
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader setIsLogged={setIsLogged} />
          <div className="c-body">
            <CSubheader className="px-3 justify-content-between">
              <CBreadcrumbRouter
                className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                routes={routes}
              />
            </CSubheader>
            <TheContent IsLogged={IsLogged} setIsLogged={setIsLogged} />
          </div>
          <TheFooter />
        </div>
      </div>
    </CategoryProvider>
  );
};

export default TheLayout;
