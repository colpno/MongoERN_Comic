import PropTypes from "prop-types";

import { ToggleableSubNavbar } from "components";
import { MOBILE_NAV_MENU } from "constants/menu.constant";
import { Footer, Header } from "layouts/components";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content skip-header">
        <ToggleableSubNavbar menu={MOBILE_NAV_MENU} />
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
