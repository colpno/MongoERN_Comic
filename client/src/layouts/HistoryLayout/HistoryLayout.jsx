import PropTypes from "prop-types";

import SubNavigator from "components/SubNavigator";
import { navMenu } from "constants/historyLayout.constant";
import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import CurrencyCount from "./components/CurrencyCount";

function HistoryLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content skip-header">
        <CurrencyCount />
        <SubNavigator menu={navMenu} />
        {children}
      </div>
      <Footer />
    </>
  );
}

HistoryLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HistoryLayout;
