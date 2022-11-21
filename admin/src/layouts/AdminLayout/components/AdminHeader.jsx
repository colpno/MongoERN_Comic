import classNames from "classnames/bind";

import { Search } from "features";
import { useSelector } from "react-redux";
import styles from "../styles/AdminHeader.module.scss";

const cx = classNames.bind(styles);

function AdminHeader() {
  const isSideBarToggle = useSelector((state) => state.global.toggleSideBar);

  return (
    <header className={cx("header", isSideBarToggle ? "sidebar--toggle" : "")}>
      <Search />
    </header>
  );
}

export default AdminHeader;
