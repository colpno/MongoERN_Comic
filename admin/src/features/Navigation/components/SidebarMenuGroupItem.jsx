import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styles from "../styles/Sidebar.module.scss";

const cx = classNames.bind(styles);

function SidebarMenuGroupItem({ Icon, label, to }) {
  const { pathname } = useLocation();

  return (
    <li className={cx("item")} key={label}>
      <a href={to} className={cx("link", "flex", pathname === to && "active")}>
        <Icon className={cx("icon")} />
        <span>{label}</span>
      </a>
    </li>
  );
}

SidebarMenuGroupItem.propTypes = {
  Icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SidebarMenuGroupItem;
