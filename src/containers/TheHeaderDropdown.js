import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = (props) => {
  const onLogout = props.onLogout;

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"%PUBLIC_URL%/avatars/ppj-logo.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
            block
            fluid
            fluidGrow
            width={250}
            height={50}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
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
