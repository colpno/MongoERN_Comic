import PropTypes from "prop-types";

import { SubNavigator } from "components";
import { HISTORY_MENU } from "constants/menu.constant";
import { Footer, Header } from "layouts/components";
import CurrencyCount from "./components/CurrencyCount";

function HistoryLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content skip-header">
        <CurrencyCount />
        <SubNavigator menu={HISTORY_MENU} slidesPerView={3} />
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
