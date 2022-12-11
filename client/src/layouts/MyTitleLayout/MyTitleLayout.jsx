import PropTypes from "prop-types";

import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import SubNavigator from "../components/SubNavigator";
import StatisticCount from "./components/StatisticCount";

function MyTitleLayout({ children }) {
  const menu = [
    { href: "/my-title", label: "Truyện của tôi" },
    { href: "/my-title/statistic", label: "Thống kê" },
    { href: "/my-title/notice", label: "Thông báo" },
  ];

  return (
    <>
      <Header />
      <div className="content skip-header">
        <StatisticCount />
        <SubNavigator menu={menu} />
        {children}
      </div>
      <Footer />
    </>
  );
}

MyTitleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyTitleLayout;
