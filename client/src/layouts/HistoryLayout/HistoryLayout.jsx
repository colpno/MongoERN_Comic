import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import SubNavigator from "layouts/components/SubNavigator";
import PropTypes from "prop-types";
import CurrencyCount from "./components/CurrencyCount";

function HistoryLayout({ children }) {
  const menu = [
    { href: "/profile/coin/add", label: "Nạp coin" },
    { href: "/profile/history/coin", label: "Lịch sử coin" },
    { href: "/profile/history/point", label: "Lịch sử point" },
    { href: "/profile/history/ticket", label: "Lịch sử vé" },
  ];

  return (
    <>
      <Header />
      <div className="content skip-header">
        <CurrencyCount />
        <SubNavigator menu={menu} />
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
