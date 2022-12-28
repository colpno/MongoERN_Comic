import PropTypes from "prop-types";

import { Footer, Header } from "layouts/components";
import BookshelfHeader from "./components/BookshelfHeader";

function BookshelfLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content skip-header">
        <BookshelfHeader />
        {children}
      </div>
      <Footer />
    </>
  );
}

BookshelfLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BookshelfLayout;
