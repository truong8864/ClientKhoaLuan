import React from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs
} from '@coreui/react'
import {
  Paper
} from '@material-ui/core'
import Personnel from './Personnel'
import ContractCover from './Contract-Cover'
import Collaborate from './Collaborate'
import TimeKeeping from './TimeKeeping/TimeKeeping.chil'
import Salary from './Salary'
//import CIcon from '@coreui/icons-react'

const DetailsStaffPage = ({match}) => {
  //const [active, setActive] = useState(1)
  const paramater = match.params.ID;

  return (
    <Paper>

    <CRow>

      <CCol className="mb-4">
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Nhân sự
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                   Hợp đồng & bảo hiểm
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Quá trình công tác
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                <CNavLink>
                  Chấm công
                </CNavLink>
                </CNavItem>
                <CNavItem>
                <CNavLink>
                  Lương
                </CNavLink>
                </CNavItem>

              </CNav>
              <CTabContent>
                <CTabPane>
                 <Personnel params={paramater}/>
                </CTabPane>
                <CTabPane>
                  <ContractCover params={paramater}/>
                </CTabPane>
                <CTabPane>
                <Collaborate/>
                </CTabPane>
                <CTabPane>
                 <TimeKeeping/>
                </CTabPane>
                <CTabPane>
                <Salary/>
               </CTabPane>
              </CTabContent>
            </CTabs>
      </CCol>
    </CRow>  </Paper>
  )
}

export default DetailsStaffPage
