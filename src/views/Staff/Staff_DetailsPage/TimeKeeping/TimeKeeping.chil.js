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

const TimeKeeping = () =>{
  return(
    <CRow>
    <CCol className="mb-4">
    <Paper>
      <CCardBody>
        <CTabs>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>
                Phép năm
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
              Quẹt thẻ
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
               Ngày công
              </CNavLink>
            </CNavItem>
            <CNavItem>
            <CNavLink>
             Ca làm việc
            </CNavLink>
                </CNavItem>
                <CNavItem>
                <CNavLink>
                Ngày nghỉ
                </CNavLink>
           </CNavItem>
                <CNavItem>
                <CNavLink>
                Tăng ca
                </CNavLink>
              </CNavItem>
              <CNavItem>
              <CNavLink>
              Bảng công chi tiết
            </CNavLink>
              </CNavItem>
              <CNavItem>
              <CNavLink>
              Chế độ công
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
export default TimeKeeping
