import PropTypes from "prop-types";

import SubNavigator from "components/SubNavigator";
import { navMenu } from "constants/myTitleLayout.constant";
import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import StatisticCount from "./components/StatisticCount";

function MyTitleLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content skip-header">
        <StatisticCount />
        <SubNavigator menu={navMenu} />
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
