// import React from "react";

// const NewContractPage = React.lazy(() =>
//   import("../ContractPage/NewContractPage")
// );
// const OrgStructurePage = React.lazy(() => import("../OrgStructurePage"));
// const DetailsStaffPage = React.lazy(() => import("../Staff_DetailsPage"));
// const ListEmployeePage = React.lazy(() =>
//   import("../EmployeeResource/ListEmployeePage")
// );
// const EmployeeQuitPage = React.lazy(() =>
//   import("../EmployeeResource/EmployeeQuitPage")
// );
// const NotYet_ContractPage = React.lazy(() =>
//   import("../ContractPage/NotYet_ContractPage")
// );
// const ContractPage = React.lazy(() =>
//   import("../ContractPage/Dashboard_ContractPage")
// );
// const ExpireContractPage = React.lazy(() =>
//   import("../ContractPage/Expire_ContractPage")
// );

// const ContractExtendPage = React.lazy(() =>
//   import("../ContractPage/ContractExtendPage")
// );

// const ReceiveNewStaffPage = React.lazy(() =>
//   import("../ReceiveNewStaff/ReceiveNewEmployee")
// );
// const ExtendContractPage = React.lazy(() =>
//   import("../ContractPage/Expire_ContractPage/extendContract.child")
// );
// const ListNewEmployeePage = React.lazy(() =>
//   import("../ReceiveNewStaff/ListNewEmployeePage")
// );
// const CollaboratePage = React.lazy(() => import("../CollaboratePage"));
// const NewCollaboratePage = React.lazy(() => import("../CollaboratePage/add"));

import NewContractPage from "../ContractPage/NewContractPage";
import OrgStructurePage from "../OrgStructurePage";
import DetailsStaffPage from "../Staff_DetailsPage";
import ListEmployeePage from "../EmployeeResource/ListEmployeePage";
import EmployeeQuitPage from "../EmployeeResource/EmployeeQuitPage";
import NotYet_ContractPage from "../ContractPage/NotYet_ContractPage";
import ContractPage from "../ContractPage/Dashboard_ContractPage";
import ExpireContractPage from "../ContractPage/Expire_ContractPage";

import ContractExtendPage from "../ContractPage/ContractExtendPage";

import ReceiveNewStaffPage from "../ReceiveNewStaff/ReceiveNewEmployee";
import ExtendContractPage from "../ContractPage/Expire_ContractPage/extendContract.child";
import ListNewEmployeePage from "../ReceiveNewStaff/ListNewEmployeePage";
import CollaboratePage from "../CollaboratePage";
import NewCollaboratePage from "../CollaboratePage/add";
const staffRoute = [
  {
    path: "/nhan-su",
    name: "Nhân sự",
    exact: true,
    component: OrgStructurePage,
  },
  {
    path: "/nhan-su/to-chuc-phong-ban",
    name: "Tổ chức phòng ban",
    component: OrgStructurePage,
    exact: true,
  },
  {
    path: "/nhan-su/du-lieu-nhan-vien",
    name: "Dữ liệu nhân viên",
    component: ListEmployeePage,
    exact: true,
  },
  {
    path: "/nhan-su/du-lieu-nhan-vien/danh-sach-nhan-vien",
    name: "Danh sách tất cả nhân viên",
    component: ListEmployeePage,
    exact: true,
  },

  {
    path: "/nhan-su/du-lieu-nhan-vien/nhan-vien-nghi-viec",
    name: "Nhân viên nghỉ viec",
    component: EmployeeQuitPage,
    exact: true,
  },
  // {
  //   path: "/nhan-su/du-lieu-nhan-vien/nhan-vien-huu",
  //   name: "Nhân viên đến tuổi nghỉ hưu",
  //   component: ListEmployeePage,
  //   exact: true,
  // },

  {
    path: "/nhan-su/chi-tiet-nhan-vien/:ID",
    name: "Chi tiết nhân viên",
    component: DetailsStaffPage,
  },
  //Hợp đồng
  {
    path: "/nhan-su/hop-dong",
    exact: true,
    name: "Hợp đồng",
    component: ContractPage,
  },
  {
    path: "/nhan-su/hop-dong/ds-chua-co-hop-dong",
    name: "ds chưa có hợp đồng",
    component: NotYet_ContractPage,
  },
  {
    path: "/nhan-su/hop-dong/ds-hop-dong",
    name: "Danh sách hợp đồng",
    component: ContractPage,
  },
  {
    path: "/nhan-su/hop-dong/tao-moi-hop-dong",
    name: "Tạo mới hợp đồng",
    component: NewContractPage,
  },

  {
    path: "/nhan-su/hop-dong/gia-han-hop-dong",
    name: "Gia hạn hợp đồng",
    component: ExtendContractPage,
  },
  {
    path: "/nhan-su/hop-dong/phu-luc-hop-dong",
    name: "Phụ lục hợp đồng",
    component: ContractExtendPage,
  },
  {
    path: "/nhan-su/tiep-nhan-nhan-vien-moi",
    name: "Tiếp nhận nhân viên mới",
    exact: true,
    component: ListNewEmployeePage,
  },
  {
    path: "/nhan-su/tiep-nhan-nhan-vien-moi/danh-sach-nhan-vien-moi",
    name: "Danh sách nhân viên mới",
    component: ListNewEmployeePage,
  },
  {
    path: "/nhan-su/tiep-nhan-nhan-vien-moi/them-nhan-vien-moi",
    name: "Thêm danh sách nhân viên",
    component: ReceiveNewStaffPage,
  },
  {
    path: "/nhan-su/qua-trinh-cong-tac",
    exact: true,
    name: "Quá trình công tác",
    component: CollaboratePage,
  },
  {
    path: "/nhan-su/qua-trinh-cong-tac/dieu-dong-bo-nhiem",
    name: "Quá trình điều động, bổ nhiệm",
    component: CollaboratePage,
  },
  {
    path: "/nhan-su/qua-trinh-cong-tac/dieu-dong-nhan-vien",
    name: "Điều động nhân viên đi công tác",
    component: NewCollaboratePage,
  },

  {
    path: "/nhan-su/hop-dong/ds-hop-dong-het-han",
    name: "Danh sách hợp đồng hết hạn",
    component: ExpireContractPage,
  },
];

export default staffRoute;
