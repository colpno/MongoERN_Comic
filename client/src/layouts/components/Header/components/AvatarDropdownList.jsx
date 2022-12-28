import PropTypes from "prop-types";

import { Scrollbar } from "components";
import AvatarDropdownGroup from "./AvatarDropdownGroup";

function AvatarDropdownList({ cx, isLoggingIn, menu, logoutClick }) {
  return (
    <Scrollbar yAxis className={cx("dropdown")}>
      <AvatarDropdownGroup cx={cx} menu={menu.slice(0, menu.length - 1)} />
      {isLoggingIn && (
        <AvatarDropdownGroup
          cx={cx}
          menu={menu.slice(menu.length - 1)}
          onClick={logoutClick}
        />
      )}
    </Scrollbar>
  );
}

AvatarDropdownList.propTypes = {
  cx: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired,
        icon: PropTypes.node.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
  logoutClick: PropTypes.func.isRequired,
};

export default AvatarDropdownList;
