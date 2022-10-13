import Button from "components/Button";
import PropTypes from "prop-types";
import { BiChevronRight } from "react-icons/bi";

function AvatarDropdownItem({ children, cx, path, icon }) {
  return (
    <div className={cx("dropdown__group__link")}>
      <Button text to={path}>
        <span className={cx("icon-box")}>{icon}</span>
        <div className={cx("text-box")}>{children}</div>
        <span className={cx("icon-box")}>
          <BiChevronRight />
        </span>
      </Button>
    </div>
  );
}

AvatarDropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  cx: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

AvatarDropdownItem.defaultProps = {};

export default AvatarDropdownItem;
