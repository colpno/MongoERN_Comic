import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { Navigation } from "features/index";
import { useState } from "react";
import styles from "./AdminLayout.module.scss";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(75);

  return (
    <div className={cx("admin-page")}>
      <Navigation setSidebarWidth={setSidebarWidth} />
      <div className={cx("body")}>
        <main className={cx("content")} style={{ paddingLeft: `${sidebarWidth}px` }}>
          {children}
        </main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
