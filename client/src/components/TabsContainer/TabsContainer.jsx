import PropTypes from "prop-types";
import TabsContainerItem from "./components/TabsContainerItem";

import "./TabsContainer.scss";

function TabsContainer({ menu }) {
  return (
    <div className="tabs-container">
      {menu.map((link) => {
        return <TabsContainerItem item={link} />;
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
