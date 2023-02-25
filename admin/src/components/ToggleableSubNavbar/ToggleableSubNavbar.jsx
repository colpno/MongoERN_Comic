import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { SubNavigator } from "components";
import styles from "./ToggleableSubNavbar.module.scss";

const cx = classNames.bind(styles);

function ToggleableSubNavbar({ menu }) {
  const isToggle = useSelector((state) => state.global.isHeaderNavBarToggled);

  return (
    <div className={cx("toggleable-navbar", isToggle ? "active" : null)}>
      <SubNavigator menu={menu} />
    </div>
  );
}

ToggleableSubNavbar.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ToggleableSubNavbar;
