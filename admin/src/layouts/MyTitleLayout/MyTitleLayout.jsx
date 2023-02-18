import PropTypes from "prop-types";

import { SubNavigator } from "components";
import { MY_TITLE_MENU } from "constants/menu.constant";
import { Footer, Header } from "layouts/components";
import StatisticCount from "./components/StatisticCount";

function MyTitleLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content skip-header">
        <StatisticCount />
        <SubNavigator menu={MY_TITLE_MENU} />
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
