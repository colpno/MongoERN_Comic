import classNames from "classnames/bind";

import Search from "layouts/components/Header/components/Search";
import styles from "../styles/AdminHeader.module.scss";

const cx = classNames.bind(styles);

function AdminHeader() {
  return (
    <header className={cx("header")}>
      <Search />
    </header>
  );
}

export default AdminHeader;