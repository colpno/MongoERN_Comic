import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";

import "./TabsContainer.scss";

function TabsContainer({ menu }) {
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get("tab") || "";

  return (
    <div className="tabs-container">
      {menu.map((link) => {
        return (
          <Link
            to={link.href}
            className={`tabs__tab${queryTab === link.tab ? " active" : ""}`}
            key={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

TabsContainer.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      tab: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default TabsContainer;
