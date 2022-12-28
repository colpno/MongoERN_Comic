import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { SubNavigator } from "components";
import { useClickOutSide } from "hooks";
import { toggleHeaderNavBar } from "libs/redux/slices/globalSlice";
import styles from "./ToggleableSubNavbar.module.scss";

const cx = classNames.bind(styles);

function ToggleableSubNavbar({ menu }) {
  const dispatch = useDispatch();
  const isToggle = useSelector((state) => state.global.toggleHeaderNavBar);

  const navbarRef = useClickOutSide(isToggle, () =>
    dispatch(toggleHeaderNavBar(!isToggle))
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
  menu: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ToggleableSubNavbar;
