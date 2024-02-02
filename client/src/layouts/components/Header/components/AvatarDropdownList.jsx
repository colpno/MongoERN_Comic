import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Scrollbar } from "components";
import { DarkModeToggle } from "features";
import AvatarDropdownGroup from "./AvatarDropdownGroup";
import styles from "../styles/AvatarDropdownList.module.scss";

const cx = classNames.bind(styles);

function AvatarDropdownList({ isLoggingIn, menu, logoutClick, setShowDropDown }) {
  return (
    <Scrollbar yAxis className={cx("dropdown")}>
      <div className={cx("dark-mode-wrapper")}>
        <DarkModeToggle />
      </div>
      <AvatarDropdownGroup
        cx={cx}
        menu={menu.slice(0, menu.length - 1)}
        setShowDropDown={setShowDropDown}
      />
      {isLoggingIn && (
        <AvatarDropdownGroup
          cx={cx}
          menu={menu.slice(menu.length - 1)}
          onClick={logoutClick}
          setShowDropDown={setShowDropDown}
        />
      )}
    </Scrollbar>
  );
}

AvatarDropdownList.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        label: PropTypes.node.isRequired,
        icon: PropTypes.node.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
  logoutClick: PropTypes.func.isRequired,
  setShowDropDown: PropTypes.func.isRequired,
};

export default AvatarDropdownList;
