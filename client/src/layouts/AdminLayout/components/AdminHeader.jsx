import classNames from "classnames/bind";

import Avatar from "layouts/components/Header/components/Avatar";
import Search from "layouts/components/Header/components/Search";
import styles from "../styles/AdminHeader.module.scss";

const cx = classNames.bind(styles);

function AdminHeader() {
  return (
    <header className={cx("header")}>
      <Search />
      <Avatar />
    </header>
  );
}

export default AdminHeader;
