import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import {HreNav,DefaultNav,AttNav} from './_nav'
 import AuthenticationAPI from "../api/authentication.api"

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const [Nav,setNav] = useState(DefaultNav)

  useEffect(()=>{
    const getRole= async ()=>{
    try {
        const result = await AuthenticationAPI.checkLogged()
        const role= result.decoder.role;
        switch (role) {
          case "admin":{
            setNav([...Nav,...HreNav,...AttNav])
            break;
          }
          case "hre":{
            setNav([...Nav,...HreNav])
            break;
          }
          case "att":{
            setNav([...Nav,...AttNav])
            break;
          }
          default:
            break;
        }
        console.log("NAV",Nav,result)

    } catch (error) {
      console.log(error)
    }
  }
    getRole()
  },[])

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
     {
       /*<CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */
     }
       <CImg
            src= {'avatars/ppjlogo.jpg'}
            alt="ppjlogo"
            name="logo-negative"
            height={50}
            width={250}
          />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={Nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
