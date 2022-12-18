import classNames from "classnames/bind";
import PropTypes from "prop-types";

import SubNavigator from "components/SubNavigator";
import { useClickOutSide } from "hooks";
import styles from "./ToggleableSubNavbar.module.scss";

const cx = classNames.bind(styles);

function ToggleableSubNavbar({ isToggle, setIsToggle, menu }) {
  const navbarRef = useClickOutSide(isToggle, () =>
    setIsToggle((prev) => !prev)
  );

  return (
    <div
      ref={navbarRef}
      className={cx("toggleable-navbar", isToggle ? "active" : null)}
    >
      <SubNavigator menu={menu} />
    </div>
  );
}

ToggleableSubNavbar.propTypes = {
  isToggle: PropTypes.bool.isRequired,
  setIsToggle: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ToggleableSubNavbar;
