import { Button } from "components";
import PropTypes from "prop-types";

function NonGroupStructure({ cx, group, currentTab, setCurrentTab }) {
  return (
    <Button
      wrapper
      to={group.to}
      className={cx("tab-wrapper", currentTab === group.tab && "active")}
      onClick={() => setCurrentTab(group.tab)}
    >
      {/* <Icon className={cx("tab-icon")} /> */}
      <span>{group.label}</span>
    </Button>
  );
}

NonGroupStructure.propTypes = {
  cx: PropTypes.func.isRequired,
  group: PropTypes.shape({
    to: PropTypes.string.isRequired,
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.shape({}).isRequired,
    tab: PropTypes.string.isRequired,
  }).isRequired,
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};

export default NonGroupStructure;
