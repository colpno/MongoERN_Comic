import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";
import styles from "../styles/Navbar.module.scss";

const cx = classNames.bind(styles);

function Navbar({ toggleSidebar }) {
  return (
    <nav className={cx("navbar", "flex")}>
      <FaBars className={cx("open-icon")} onClick={toggleSidebar} />
    </nav>
  );
}

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
