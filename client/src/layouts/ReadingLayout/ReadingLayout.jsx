import Footer from "layouts/components/Footer";
import PropTypes from "prop-types";
import ReadingHeader from "./components/ReadingHeader";

function ReadingLayout({ children }) {
  return (
    <>
      <ReadingHeader />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
}

ReadingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReadingLayout;
