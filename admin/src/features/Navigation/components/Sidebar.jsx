import { Logo } from "assets/images";
import classNames from "classnames/bind";
import { Button } from "components";
// eslint-disable-next-line no-unused-vars
import { useTheme } from "@mui/material";
import { DarkModeToggle } from "features/index.jsx";
import PropTypes from "prop-types";
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
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
  const theme = useTheme();

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
          <Logo
            className={cx("logo_image")}
            title="Trang chủ"
            style={{ fill: theme.palette.mode === "light" ? "#000" : "#fff" }}
          />
        </Button>
        <LockButton isLocked={isSidebarLocked} onClick={toggleLock} />
        <IoClose className={cx("close-icon")} onClick={toggleSidebar} />
      </div>
      <div className={cx("controls")}>
        <DarkModeToggle />
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
