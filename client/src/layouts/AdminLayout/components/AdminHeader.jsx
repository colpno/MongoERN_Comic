import classNames from "classnames/bind";

import Search from "layouts/components/Header/components/Search";
import styles from "../styles/AdminHeader.module.scss";

const cx = classNames.bind(styles);

function AdminHeader() {
  return (
    <header className={cx("header")}>
      <Search />
      <div className={cx("avatar")}>
        {/* <img
          src={user.avatar}
          alt="User avatar"
          className={cx("avatar__icon")}
        /> */}
        <span className={cx("avatar__name")}>Đăng nhập</span>
      </div>
    </header>
  );
}

export default AdminHeader;
