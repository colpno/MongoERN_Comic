import { Button } from "components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function NonGroupStructure({ cx, group }) {
  const urlPath = useLocation().pathname;

  return (
    <Button
      wrapper
      to={group.to}
      className={cx("tab-wrapper", urlPath.includes(group.tab) && "active")}
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
};

export default NonGroupStructure;
