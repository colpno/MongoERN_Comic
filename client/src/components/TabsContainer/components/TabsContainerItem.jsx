import { Link, useSearchParams } from "react-router-dom";

import React from "react";
import PropTypes from "prop-types";

function TabsContainerItem({ item }) {
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get("tab") || "";

  return (
    <Link to={item.href} className={`tabs__tab${queryTab === item.tab ? " active" : ""}`}>
      {item.label}
    </Link>
  );
}

TabsContainerItem.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tab: PropTypes.string,
  }).isRequired,
};

export default TabsContainerItem;
