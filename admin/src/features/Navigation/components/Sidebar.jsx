import { Logo } from "assets/images";
import { IoClose } from "react-icons/io5";
import classNames from "classnames/bind";
import { Button } from "components";
import PropTypes from "prop-types";
import { CiLock, CiUnlock } from "react-icons/ci";
import styles from "../styles/Sidebar.module.scss";
import SidebarMenu from "./SidebarMenu";
import SidebarProfile from "./SidebarProfile";

const cx = classNames.bind(styles);

function LockButton({ isLocked, onClick }) {
  if (isLocked) return <CiLock className={cx("lock-icon")} onClick={onClick} />;
  return <CiUnlock className={cx("lock-icon")} onClick={onClick} />;
}

function Sidebar({
  isSidebarLocked,
  isSidebarOpen,
  showSidebar,
  hideSidebar,
  toggleLock,
  toggleSidebar,
}) {
  return (
    <nav
      className={cx(
        "sidebar",
        isSidebarLocked && "locked",
        !isSidebarLocked && "hoverable",
        !isSidebarOpen && "close"
      )}
      onMouseEnter={showSidebar}
      onMouseLeave={hideSidebar}
    >
      <div className={cx("logo_items", "flex")}>
        <Button wrapper to="/" className={cx("nav_image")}>
          <Logo className={cx("logo_image")} title="Trang chủ" style={{ fill: "#000" }} />
        </Button>
        <LockButton isLocked={isSidebarLocked} onClick={toggleLock} />
        <IoClose className={cx("close-icon")} onClick={toggleSidebar} />
      </div>
      <SidebarMenu />
      <SidebarProfile />
    </nav>
  );
}

Sidebar.propTypes = {
  isSidebarLocked: PropTypes.bool.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  showSidebar: PropTypes.func.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  toggleLock: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

LockButton.propTypes = {
  isLocked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Sidebar;
