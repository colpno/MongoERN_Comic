import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";

import AdminHeader from "./components/AdminHeader";
import AdminSideBar from "./components/AdminSideBar";
import styles from "./styles/AdminLayout.module.scss";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  const [toggleSideBar, setToggleSideBar] = useState(true);

  return (
    <div className={cx("admin-page")}>
      <AdminHeader cx={cx} />
      <div className={cx("body")}>
        <AdminSideBar
          visible={toggleSideBar}
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
