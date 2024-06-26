import classNames from "classnames/bind";
import { Button } from "components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styles from "../styles/Sidebar.module.scss";

const cx = classNames.bind(styles);

function SidebarMenuGroupItem({ Icon, label, to, onClick }) {
  const { pathname } = useLocation();

  return (
    <li className={cx("item")}>
      <Button
        wrapper
        fullWidth
        to={to}
        onClick={onClick}
        className={cx("link", "flex", pathname === to && "active")}
      >
        <Icon className={cx("icon")} />
        <span>{label}</span>
      </Button>
    </li>
  );
}

SidebarMenuGroupItem.propTypes = {
  Icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

SidebarMenuGroupItem.defaultProps = {
  to: undefined,
  onClick: undefined,
};

export default SidebarMenuGroupItem;
