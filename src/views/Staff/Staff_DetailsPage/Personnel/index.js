import React, { useEffect, useState } from "react";
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
} from "@coreui/react";

import Infor from "./Infor";
import { GetHre_Profie_Api } from "../../../../callAPI/Hre_Profile.api";
import OrgStructureChild from "./Orgstructure";
const Personnel = (props) => {
  const [infor, setInfor] = useState([]);
  const {params} = props;
  const [OrgStructureID,setOrgStructureID]=useState("")
  useEffect(() => {
    GetHre_Profie_Api(params).then((res) => {
      if (res.data) {
        setInfor([res.data]);
        setOrgStructureID(res.data.OrgStructureID)
      }
    });
  }, [params]);

  return (
    <CRow>
      <CCol className="mb-4">
        <CCard>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>Thông tin nhân viên</CNavLink>
                </CNavItem>
                <CNavItem>
                <CNavLink>Bộ phận trực thuộc</CNavLink>
              </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <Infor data={infor} IDQualification={params}/>
                </CTabPane>
                <CTabPane>
                  <OrgStructureChild OrgStructureID={OrgStructureID}/>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Personnel;
