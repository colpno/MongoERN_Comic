import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import PropTypes from "prop-types";

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
