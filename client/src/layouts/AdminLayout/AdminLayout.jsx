import PropTypes from "prop-types";

import { SideBar } from "components";
import Avatar from "layouts/components/Header/components/Avatar";
import Search from "layouts/components/Header/components/Search";

function AdminLayout({ children }) {
  const menu = [
    {
      to: "sanpham",
      icon: "fas fa-box-open",
      label: "Sản phẩm",
    },
    {
      to: "nhapxuat",
      icon: "fas fa-truck-moving",
      label: "Nhập xuất",
    },
    {
      to: "taikhoan",
      icon: "far fa-user-circle",
      label: "Tài khoản",
    },
    {
      to: "doitac",
      icon: "far fa-handshake",
      label: "Đối tác",
    },
    {
      to: "thongke",
      icon: "far fa-chart-bar",
      label: "Thống kê",
    },
    {
      to: "quyen",
      icon: "fas fa-cog",
      label: "Quyền",
    },
  ];

  return (
    <div className="admin-page">
      <input type="checkbox" className="hidden" id="sidebar--toggle" />
      <SideBar menu={menu} />
      <div className="main-content">
        <header>
          <label htmlFor="sidebar--toggle">
            <i className="fas fa-bars" />
            <span>Menu</span>
          </label>
          <Search />
          <Avatar />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
