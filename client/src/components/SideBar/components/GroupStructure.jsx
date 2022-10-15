import { Button } from "components";
import PropTypes from "prop-types";

function GroupStructure({ group, cx, currentTab, setCurrentTab }) {
  return (
    <>
      <p className={cx("group-label")}>{group.groupLabel}</p>
      <ul className={cx("sub-menu")}>
        {group.subMenu.map((tab, index2) => {
          const Icon = tab.icon;
          return (
            <li className={cx("tab-wrapper")} key={index2}>
              <Button
                wrapper
                to={tab.to}
                className={cx("tab", currentTab === tab.tab && "active")}
                onClick={() => setCurrentTab(tab.tab)}
              >
                <Icon className={cx("tab-icon")} />
                <span className={cx("tab-label")}>{tab.label}</span>
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
        to: PropTypes.string.isRequired,
        href: PropTypes.string,
        label: PropTypes.string.isRequired,
        icon: PropTypes.shape({}).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};

export default GroupStructure;
