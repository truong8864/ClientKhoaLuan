//import React from "react";

// const PayrollPage = React.lazy(() => import("../PayrollPage"));
// const SalaryPage = React.lazy(() => import("../SalaryPage"));
import PayrollPage from "../PayrollPage";
import SalaryPage from "../SalaryPage";
const SalaryRoute = [
  {
    path: "/luong",
    name: "Lương",
    exact: true,
    component: SalaryPage,
  },
  {
    path: "/luong/tinh-luong",
    name: "Tính lương",
    exact: true,
    component: PayrollPage,
  },
  {
    path: "/luong/du-lieu-luong",
    name: "Dữ liệu lương",
    exact: true,
    component: SalaryPage,
  },
];

export default SalaryRoute;
