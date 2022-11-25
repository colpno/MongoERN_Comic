/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { FaBars } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { Logo } from "assets/images";
import { Button, Image } from "components";
import { SideBar } from "features";
import { useLogout } from "hooks";
import { toggleSideBar } from "libs/redux/slices/globalSlice";
import getAdminSideBarMenu from "utils/constants";
import styles from "../styles/AdminSideBar.module.scss";

const cx = classNames.bind(styles);

function AdminSideBar() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.global.searchText);
  const toggle = useSelector((state) => state.global.toggleSideBar);
  const menu = getAdminSideBarMenu();
  const user = useSelector((state) => state.user.user);
  const { logout } = useLogout("/");

  const setToggleSideBar = (isToggle) => {
    dispatch(toggleSideBar(isToggle));
  };

  return (
    <div className={cx("sidebar-container", toggle ? "active" : "")}>
      <div className={cx("dump", toggle ? "active" : "")} />
      <aside className={`sidebar ${toggle ? "active" : ""}`}>
        <div className={cx("logo-container")}>
          <Button wrapper to="/" className={cx("logo-button")}>
            <Logo className={cx("logo")} />
          </Button>
          <FaBars
            className={cx("sidebar--toggle")}
            onClick={() => setToggleSideBar(!toggle)}
          />
        </div>
        <div className={cx("menu")}>
          <SideBar menu={menu} defaultTab={menu[0].subMenu[0].tab} />
        </div>
        <div className={cx("user-info")}>
          <Image
            src={user.avatar}
            alt="User avatar"
            className={cx("avatar")}
            width={60}
            height={60}
          />
          <span className={cx("username")}>{user.username}</span>
          <Button wrapper onClick={logout} className={cx("logout")}>
            <IoIosLogOut className={cx("icon")} />
          </Button>
        </div>
      </aside>
    </div>
  );
}

AdminSideBar.propTypes = {};

export default AdminSideBar;
