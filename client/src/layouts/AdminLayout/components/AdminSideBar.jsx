import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { Logo } from "assets/images";
import { Button, SideBar } from "components";
import { BsLayoutSidebarInset } from "react-icons/bs";
import styles from "../styles/AdminSideBar.module.scss";

const cx = classNames.bind(styles);

function AdminSideBar({
  visible,
  menu,
  defaultTab,
  setToggleSideBar,
  toggleSideBar,
}) {
  return (
    <aside className={cx("sidebar", visible ? "" : "visible")}>
      <Button wrapper to="/" className={cx("logo-wrapper")}>
        <Logo className={cx("logo")} />
      </Button>
      <BsLayoutSidebarInset
        className={cx("sidebar--toggle")}
        onClick={() => setToggleSideBar(!toggleSideBar)}
      />
      <SideBar menu={menu} defaultTab={defaultTab} />
    </aside>
  );
}

AdminSideBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      groupLabel: PropTypes.string.isRequired,
      subMenu: PropTypes.arrayOf(
        PropTypes.shape({
          to: PropTypes.string.isRequired,
          href: PropTypes.string,
          label: PropTypes.string.isRequired,
          icon: PropTypes.shape({}).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
  defaultTab: PropTypes.string.isRequired,
  setToggleSideBar: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.bool.isRequired,
};

export default AdminSideBar;
