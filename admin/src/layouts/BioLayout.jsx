import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { SubNavigator } from "components";
import { Navigation } from "features/index.jsx";
import { useState } from "react";
import styles from "./AdminLayout/AdminLayout.module.scss";

const cx = classNames.bind(styles);

const menu = [
  { href: "/profile", label: "Thông tin cá nhân" },
  { href: "/profile/password", label: "Thay đổi mật khẩu" },
];

function BioLayout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(75);

  return (
    <div className={cx("admin-page")}>
      <Navigation setSidebarWidth={setSidebarWidth} />
      <SubNavigator menu={menu} slidesPerView={menu.length <= 3 ? menu.length : 3} />
      <div className={cx("body")}>
        <main className={cx("content")} style={{ paddingLeft: `${sidebarWidth}px` }}>
          {children}
        </main>
      </div>
    </div>
  );
}

BioLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BioLayout;
