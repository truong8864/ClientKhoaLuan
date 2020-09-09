import React from 'react';


const ToChucPhongBan = React.lazy(() => import('../ToChucNhanSu/ToChucPhongBan'));
const DanhSachPhongBan = React.lazy(() => import('../ToChucNhanSu/DanhSachPhongBan'));

const ChiTietNhanVien = React.lazy(() => import('../ChiTietNhanVien'));

const DanhSachNhanVien = React.lazy(() => import('../DuLieuNhanVien/DanhSachNhanVien'));
const NhanVienNghiViec = React.lazy(() => import('../DuLieuNhanVien/NhanVienNghiViec'));
const NhanVienNghiHuu = React.lazy(() => import('../DuLieuNhanVien/NhanVienNghiHuu'));
const TrinhDoChuyenMon = React.lazy(() => import('../DuLieuNhanVien/TrinhDoChuyenMon'));
const NguoiThan = React.lazy(() => import('../DuLieuNhanVien/NguoiThan'));

const routes = [
  { path: '/nhan-su', exact: true, name: 'Nhân sự',component:ToChucPhongBan},

  { path: '/nhan-su/chi-tiet-nhan-vien', exact: true, name: 'Chi tiết nhân viên' ,component:ChiTietNhanVien},
  { path: '/nhan-su/to-chuc-nhan-su', exact: true, name: 'Tổ chức nhân sự' ,component:ToChucPhongBan},
  { path: '/nhan-su/to-chuc-nhan-su/danh-sach-phong-ban', exact: true, name: 'Danh sách phòng ban' ,component:DanhSachPhongBan},
  { path: '/nhan-su/to-chuc-nhan-su/to-chuc-phong-ban', exact: true, name: 'Tổ chức phòng ban' ,component:ToChucPhongBan},

  { path: '/nhan-su/du-lieu-nhan-vien', exact: true, name: 'Dữ liệu nhân viên' ,component:DanhSachNhanVien},
  { path: '/nhan-su/du-lieu-nhan-vien/danh-sach-nhan-vien', exact: true, name: 'Danh sách nhân viên' ,component:DanhSachNhanVien},
  { path: '/nhan-su/du-lieu-nhan-vien/nhan-vien-nghi-viec', exact: true, name: 'Nhân viên nghỉ việc' ,component:NhanVienNghiViec},
  { path: '/nhan-su/du-lieu-nhan-vien/nhan-vien-nghi-huu', exact: true, name: 'Danh sách nghỉ hưu' ,component:NhanVienNghiHuu}, 
  { path: '/nhan-su/du-lieu-nhan-vien/trinh-do-chuyen-mon', exact: true, name: 'Danh sách nghỉ hưu' ,component:TrinhDoChuyenMon},
  { path: '/nhan-su/du-lieu-nhan-vien/nguoi-than', exact: true, name: 'Danh sách nghỉ hưu' ,component:NguoiThan},
 
 
];

export default routes;
