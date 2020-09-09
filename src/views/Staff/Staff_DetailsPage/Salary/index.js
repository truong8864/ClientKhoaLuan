import React from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCardBody,
  CTabs
} from '@coreui/react'
import {
  Paper
} from '@material-ui/core'
const Salary = () =>{
  return(
    <CRow>
    <CCol className="mb-4">
    <Paper>
      <CCardBody>
        <CTabs>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>
                Thông tin lương
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
              Phiếu lương
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
              Lương cơ bản
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
              Người phụ thuộc
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane>

            </CTabPane>
            <CTabPane>

            </CTabPane>
            <CTabPane>

            </CTabPane>
          </CTabContent>
        </CTabs>
    </CCardBody>
    </Paper>
  </CCol>

  </CRow>
  )
}
export default Salary
