import React, { useEffect, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import AuthenticationAPI from "../api/authentication.api";

const TheHeaderDropdown = (props) => {
  const onLogout = props.onLogout;
  const [User, setUser] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await AuthenticationAPI.checkLogged();
        if ("DA_DANG_NHAP" === res.message) {
          return setUser(res.decoder);
        }
      } catch (error) {
        console.log("ERR");
      }
    };
    fetchAPI();
  }, []);

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={"avatars/6.jpg"} className="c-avatar-img" alt="IMG" />
          {`${User.username}`}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>
            {!User.username ? "No user" : `${User.username}-${User.role}`}
          </strong>
        </CDropdownItem>

        <CDropdownItem
          onClick={(e) => {
            onLogout(e);
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          LogOut
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
