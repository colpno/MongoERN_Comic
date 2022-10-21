import { Button } from "components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function GroupStructure({ group, cx }) {
  const urlPath = useLocation().pathname;

  return (
    <>
      <p className={cx("group-label")}>{group.groupLabel}</p>
      <ul className={cx("sub-menu")}>
        {group.subMenu.map((tab, index) => {
          const { icon: Icon, to, label } = tab;

          return (
            <li className={cx("tab-wrapper")} key={index}>
              <Button
                wrapper
                to={to}
                className={cx("tab", urlPath.includes(to) && "active")}
              >
                <Icon className={cx("tab-icon")} />
                <span className={cx("tab-label")}>{label}</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

GroupStructure.propTypes = {
  cx: PropTypes.func.isRequired,
  group: PropTypes.shape({
    groupLabel: PropTypes.string.isRequired,
    subMenu: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string,
        href: PropTypes.string,
        label: PropTypes.string.isRequired,
        icon: PropTypes.shape({}).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default GroupStructure;
