import React from "react";
import PropTypes from "prop-types";
import Header from "layouts/components/Header";
import Footer from "layouts/components/Footer";
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
