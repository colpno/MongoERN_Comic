import PropTypes from "prop-types";

import { SubNavigator } from "components";
import { MY_TITLE_MENU } from "constants/menu.constant";
import { useCheckUseService } from "hooks/index.jsx";
import { Footer, Header } from "layouts/components";
import { useEffect } from "react";
import StatisticCount from "./components/StatisticCount";

function MyTitleLayout({ children }) {
  const { handleCheck, isPassed } = useCheckUseService();

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <>
      <Header />
      <div className="content skip-header">
        {isPassed && (
          <>
            <StatisticCount />
            <SubNavigator menu={MY_TITLE_MENU} />
            {children}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

MyTitleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyTitleLayout;
