import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { Logo } from "assets/images";
import { Button } from "components";
import { SideBar } from "features";
import { BsLayoutSidebarInset } from "react-icons/bs";
import getAdminSideBarMenu from "utils/constants";
import styles from "../styles/AdminSideBar.module.scss";

const cx = classNames.bind(styles);

function AdminSideBar({ visible, setToggleSideBar, toggleSideBar }) {
  const menu = getAdminSideBarMenu();

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
    </aside>
  );
}

AdminSideBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  setToggleSideBar: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.bool.isRequired,
};

export default AdminSideBar;
