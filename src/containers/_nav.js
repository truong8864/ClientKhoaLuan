const HreNav = [{
  _tag: "CSidebarNavTitle",
  _children: ["NHÂN SỰ"],
  icon: "cil-drop",
},
{
  _tag: "CSidebarNavItem",
  name: "Tổ chức phòng ban",
  to: "/nhan-su/to-chuc-phong-ban",
  icon: "cil-drop",
},
/*
{
  _tag: "CSidebarNavItem",
  name: "Nhân viên đang làm việc",
  to: "/nhan-su/nhan-vien-dang-lam-viec",
  icon: "cil-pencil",
},*/
{
  _tag: "CSidebarNavDropdown",
  name: "Tiếp nhận nhân viên mới",
  to: "/nhan-su/tiep-nhan-nhan-vien-moi",
  icon: "cil-pencil",
  _children: [
    // {
    //   _tag: "CSidebarNavItem",
    //   name: "Thêm nhân viên mới",
    //   to: "/nhan-su/tiep-nhan-nhan-vien-moi/them-nhan-vien-moi",
    // },
    {
      _tag: "CSidebarNavItem",
      name: "Danh sách nhân viên mới",
      to: "/nhan-su/tiep-nhan-nhan-vien-moi/danh-sach-nhan-vien-moi",
    },
  ],
},
{
  _tag: "CSidebarNavDropdown",
  name: "Dữ liệu nhân viên",
  to: "/nhan-su/du-lieu-nhan-vien",
  icon: "cil-pencil",
  _children: [
    {
      _tag: "CSidebarNavItem",
      name: "Danh sách tất cả nhân viên",
      to: "/nhan-su/du-lieu-nhan-vien/danh-sach-nhan-vien",
    },
    {
      _tag: "CSidebarNavItem",
      name: "Nhân viên nghỉ việc",
      to: "/nhan-su/du-lieu-nhan-vien/nhan-vien-nghi-viec",
    },
    // {
    //   _tag: "CSidebarNavItem",
    //   name: "Nhân viên đến tuổi nghỉ hưu",
    //   to: "/nhan-su/du-lieu-nhan-vien/nhan-vien-huu",
    // },
    // {
    //   _tag: "CSidebarNavItem",
    //   name: "Danh sách trình độ chuyên môn",
    //   to: "/nhan-su/du-lieu-nhan-vien/nhan-vien-nghi-viec",
    // },
  ],
},
{
  _tag: "CSidebarNavDropdown",
  name: "Hợp đồng",
  to: "/nhan-su/hop-dong",
  icon: "cil-pencil",
  _children: [
    {
      _tag: "CSidebarNavItem",
      name: "Tạo mới hợp đồng",
      to: "/nhan-su/hop-dong/tao-moi-hop-dong",
    },
    {
      _tag: "CSidebarNavItem",
      name: "Danh sách hợp đồng",
      to: "/nhan-su/hop-dong/ds-hop-dong",
    },

    {
      _tag: "CSidebarNavItem",
      name: "Ds nhân viên chưa có hợp đồng",
      to: "/nhan-su/hop-dong/ds-chua-co-hop-dong",
    },
    {
      _tag: "CSidebarNavItem",
      name: "Danh sách hợp đồng hết hạn",
      to: "/nhan-su/hop-dong/ds-hop-dong-het-han",
    },
    {
      _tag: "CSidebarNavItem",
      name: "Phụ lục hợp đồng",
      to: "/nhan-su/hop-dong/phu-luc-hop-dong",
    },
  ],
},
{
  _tag: "CSidebarNavDropdown",
  name: "Quá trình công tác",
  to: "/nhan-su/qua-trinh-cong-tac",
  icon: "cil-pencil",
  _children: [
    {
      _tag: "CSidebarNavItem",
      name: "Điều động nhân viên",
      to: "/nhan-su/qua-trinh-cong-tac/dieu-dong-nhan-vien",
    },
    {
      _tag: "CSidebarNavItem",
      name: "Qtr điều động & bổ nhiệm",
      to: "/nhan-su/qua-trinh-cong-tac/dieu-dong-bo-nhiem",
    },
  ],
},]
const AttNav = [  {
  _tag: "CSidebarNavTitle",
  _children: ["Chấm công"],
},
{
  _tag: "CSidebarNavDropdown",
  name: "Dữ liệu chấm công",
  route: "/cham-cong",
  icon: "cil-puzzle",
  _children: [
    {
      _tag: "CSidebarNavItem",
      name: "Dữ liệu ngày công",
      to: "/cham-cong/du-lieu-ngay-cong",
    },
    {
      _tag: "CSidebarNavItem",
      name: "Dữ liệu tổng hợp công",
      to: "/cham-cong/du-lieu-tong-hop-cong",
    },
  ],
},
{
  _tag: "CSidebarNavItem",
  icon: "cil-puzzle",
  name: "Tổng hợp công",
  to: "/cham-cong/tong-hop-cong",
},
{
  _tag: "CSidebarNavItem",
  icon: "cil-puzzle",
  name: "Nghỉ-Phép",
  to: "/cham-cong/nghi-phep",
},
{
  _tag: "CSidebarNavTitle",
  _children: ["Lương"],
},
{
  _tag: "CSidebarNavDropdown",
  name: "Lương",
  to: "/luong",
  icon: "cil-pencil",
  _children: [
    {
      _tag: "CSidebarNavItem",
      icon: "cil-puzzle",
      name: "Dữ liệu lương",
      to: "/luong/du-lieu-luong",
    },
    {
      _tag: "CSidebarNavItem",
      icon: "cil-puzzle",
      name: "Tính lương",
      to: "/luong/tinh-luong",
    },
  ],
},]
const DefaultNav=[{
  _tag: "CSidebarNavItem",
  name: "Bảng Quản lý",
  to: "/",
  icon: "cil-speedometer",
  badge: {
    color: "info",
    text: "HR",
  },
},]


export {HreNav,AttNav,DefaultNav}


