import { Button } from "components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function GroupStructure({ isToggle, group, cx }) {
  const urlPath = useLocation().pathname;

  return (
    <>
      <p className={cx("group-label", isToggle ? "" : "visible")}>
        {group.groupLabel}
      </p>
      <ul className={cx("sub-menu")}>
        {group.subMenu.map((tab, index) => {
          const { icon: Icon, to, label } = tab;

          return (
            <li className={cx("tab-container")} key={index}>
              <Button
                wrapper
                to={to}
                className={cx("tab", urlPath.includes(to) && "active")}
              >
                <Icon className={cx("tab-icon")} />
                <span className={cx("tab-label", isToggle ? "" : "visible")}>
                  <div className={cx("separator")} />
                  {label}
                </span>
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

GroupStructure.propTypes = {
  isToggle: PropTypes.bool,
  cx: PropTypes.func.isRequired,
  group: PropTypes.shape({
    groupLabel: PropTypes.string.isRequired,
    subMenu: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string,
        href: PropTypes.string,
        label: PropTypes.string.isRequired,
        icon: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
      }).isRequired
    ).isRequired,
  }).isRequired,
};

GroupStructure.defaultProps = {
  isToggle: true,
};

export default GroupStructure;
