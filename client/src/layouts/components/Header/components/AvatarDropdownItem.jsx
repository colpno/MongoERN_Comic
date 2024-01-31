import PropTypes from "prop-types";
import { BiChevronRight } from "react-icons/bi";

import { Button } from "components";

function AvatarDropdownItem({ children, cx, path, icon, onClick, setShowDropDown }) {
  return (
    <Button
      wrapper
      to={path}
      onClick={() => {
        setShowDropDown(false);
        onClick();
      }}
      className={cx("dropdown__group__link")}
    >
      <span className={cx("icon-box")}>{icon}</span>
      <div className={cx("text-box")}>{children}</div>
      <span className={cx("icon-box")}>
        <BiChevronRight />
      </span>
    </Button>
  );
}

AvatarDropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  cx: PropTypes.func.isRequired,
  path: PropTypes.string,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  setShowDropDown: PropTypes.func.isRequired,
};

AvatarDropdownItem.defaultProps = {
  onClick: () => {},
  path: "",
};

export default AvatarDropdownItem;
