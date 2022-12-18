import PropTypes from "prop-types";
import { useState } from "react";

import { ToggleableSubNavbar } from "components";
import { subNavMenu } from "constants/defaultLayout.constant";
import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";

function DefaultLayout({ children }) {
  const [toggleMobileNavbar, setToggleMobileNavbar] = useState(false);

  const handleToggleMobileNavbar = () => {
    setToggleMobileNavbar((prev) => !prev);
  };

  return (
    <>
      <Header toggleMobileNavbar={handleToggleMobileNavbar} />
      <div className="content skip-header">
        <ToggleableSubNavbar
          isToggle={toggleMobileNavbar}
          setIsToggle={setToggleMobileNavbar}
          menu={subNavMenu}
        />
        {children}
      </div>
      <Footer />
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
