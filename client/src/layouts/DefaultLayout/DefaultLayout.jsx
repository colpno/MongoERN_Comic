import PropTypes from "prop-types";
import { useState } from "react";

import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import SubNavigator from "layouts/components/SubNavigator";

function DefaultLayout({ children }) {
  const [toggleMobileNavbar, setToggleMobileNavbar] = useState(false);

  const headerNavigation = [
    { href: "/", label: "Trang chủ" },
    { href: "/comic/weekly", label: "Hàng tuần" },
    { href: "/comic/ranking", label: "Xếp hạng" },
    { href: "/comic/complete", label: "Truyện hoàn thành" },
  ];

  const handleToggleMobileNavbar = () => {
    setToggleMobileNavbar((prev) => !prev);
  };

  console.log(toggleMobileNavbar);

  return (
    <>
      <Header toggleMobileNavbar={handleToggleMobileNavbar} />
      <div className="content skip-header">
        <SubNavigator menu={headerNavigation} />
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
