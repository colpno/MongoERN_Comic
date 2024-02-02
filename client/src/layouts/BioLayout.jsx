import PropTypes from "prop-types";

import { SubNavigator } from "components";
import { Footer, Header } from "layouts/components";

const menu = [
  { href: "/profile/update", label: "Thông tin cá nhân" },
  { href: "/profile/update/password", label: "Thay đổi mật khẩu" },
];

function BioLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content skip-header">
        <SubNavigator menu={menu} slidesPerView={menu.length <= 3 ? menu.length : 3} />
        {children}
      </div>
      <Footer />
    </>
  );
}

BioLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BioLayout;
