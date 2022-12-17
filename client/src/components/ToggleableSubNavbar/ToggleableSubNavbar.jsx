import classNames from "classnames/bind";
import PropTypes from "prop-types";

import SubNavigator from "components/SubNavigator";
import styles from "./ToggleableSubNavbar.module.scss";

const cx = classNames.bind(styles);

function ToggleableSubNavbar({ isToggle, menu }) {
  return (
    <div className={cx("toggleable-navbar", isToggle ? "active" : null)}>
      <SubNavigator menu={menu} />
    </div>
  );
}

ToggleableSubNavbar.propTypes = {
  isToggle: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ToggleableSubNavbar;
