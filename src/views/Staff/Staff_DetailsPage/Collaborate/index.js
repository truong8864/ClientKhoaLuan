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

const Collaborate = () =>{
  return(
    <CRow>
    <CCol className="mb-4">
    <Paper>
      <CCardBody>
        <CTabs>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>
                Qua trình công tác
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
              Khen thưởng
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
              Kỉ luật
              </CNavLink>
            </CNavItem>
            <CNavItem>
            <CNavLink>
            Tai nạn
            </CNavLink>
          </CNavItem>
          <CNavItem>
          <CNavLink>
          Lịch sử thay đổi thẻ
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
export default Collaborate
