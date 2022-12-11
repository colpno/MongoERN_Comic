import PropTypes from "prop-types";

import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
// REMOVE: import SubNavigator from "layouts/components/SubNavigator";

function DefaultLayout({ children }) {
  /* REMOVE
   const headerNavigation = [
     { href: "/", label: "Trang chủ" },
     { href: "/comic/weekly", label: "Hàng tuần" },
     { href: "/comic/ranking", label: "Xếp hạng" },
     { href: "/comic/complete", label: "Truyện hoàn thành" },
   ];
   */

  return (
    <>
      <Header />
      <div className="content skip-header">
        {/* REMOVE: <SubNavigator menu={headerNavigation} /> */}
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
