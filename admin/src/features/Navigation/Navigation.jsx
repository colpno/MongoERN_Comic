import PropTypes from "prop-types";
import { memo, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Navigation({ setSidebarWidth }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarLocked, setSidebarLocked] = useState(false);

  const toggleLock = () => {
    setSidebarLocked(!isSidebarLocked);
  };

  const hideSidebar = () => {
    if (isSidebarLocked) return;
    setSidebarOpen(false);
    setSidebarWidth(75);
  };

  const showSidebar = () => {
    if (isSidebarLocked) return;
    setSidebarOpen(true);
    setSidebarWidth(270);
  };

  const toggleSidebar = () => {
    isSidebarOpen ? setSidebarWidth(75) : setSidebarWidth(270);
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar
        isSidebarLocked={isSidebarLocked}
        isSidebarOpen={isSidebarOpen}
        showSidebar={showSidebar}
        hideSidebar={hideSidebar}
        toggleLock={toggleLock}
        toggleSidebar={toggleSidebar}
      />
      <Navbar toggleSidebar={toggleSidebar} />
    </div>
  );
}

Navigation.propTypes = {
  setSidebarWidth: PropTypes.func.isRequired,
};

export default memo(Navigation);
