import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { IoIosLogOut } from "react-icons/io";

import { Logo } from "assets/images";
import { Button, Image } from "components";
import { SideBar } from "features";
import { useLogout } from "hooks";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { useSelector } from "react-redux";
import getAdminSideBarMenu from "utils/constants";
import styles from "../styles/AdminSideBar.module.scss";

const cx = classNames.bind(styles);

function AdminSideBar({ visible, setToggleSideBar, toggleSideBar }) {
  const menu = getAdminSideBarMenu();
  const user = useSelector((state) => state.user.user);
  const { logout } = useLogout("/");

  return (
    <aside className={cx("sidebar", visible ? "" : "visible")}>
      <Button wrapper to="/" className={cx("logo-wrapper")}>
        <Logo className={cx("logo")} />
      </Button>
      <BsLayoutSidebarInset
        className={cx("sidebar--toggle")}
        onClick={() => setToggleSideBar(!toggleSideBar)}
      />
      <SideBar menu={menu} defaultTab={menu[0].subMenu[0].tab} />
      <div className={cx("user-info")}>
        <Image
          src={user.avatar}
          alt="User avatar"
          className={cx("avatar")}
          width={50}
          height={50}
        />
        <span className={cx("username")}>{user.username}</span>
        <Button onClick={logout}>
          <IoIosLogOut className={cx("logout-icon")} />
        </Button>
      </div>
    </aside>
  );
}

AdminSideBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  setToggleSideBar: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.bool.isRequired,
};

export default AdminSideBar;
