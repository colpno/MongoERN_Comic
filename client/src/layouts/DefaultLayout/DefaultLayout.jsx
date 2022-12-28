import PropTypes from "prop-types";

import { Footer, Header } from "layouts/components";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content skip-header">{children}</div>
      <Footer />
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
