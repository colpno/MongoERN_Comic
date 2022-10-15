import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";

import getAdminSideBarMenu from "utils/getAdminSideBarMenu";
import AdminHeader from "./components/AdminHeader";
import AdminSideBar from "./components/AdminSideBar";
import styles from "./styles/AdminLayout.module.scss";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  const menu = getAdminSideBarMenu();
  const [toggleSideBar, setToggleSideBar] = useState(true);

  return (
    <div className={cx("admin-page")}>
      <AdminHeader cx={cx} />
      <div className={cx("body")}>
        <AdminSideBar
          menu={menu}
          visible={toggleSideBar}
          defaultTab={menu[0].subMenu[0].tab}
          setToggleSideBar={setToggleSideBar}
          toggleSideBar={toggleSideBar}
        />
        <main className={cx("content")}>{children}</main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
