import { IconButton } from "@mui/material";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";
import styles from "../styles/Navbar.module.scss";

const cx = classNames.bind(styles);

function Navbar({ toggleSidebar }) {
  return (
    <nav className={cx("navbar", "flex")}>
      <IconButton onClick={toggleSidebar}>
        <FaBars className={cx("open-icon")} />
      </IconButton>
    </nav>
  );
}

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
