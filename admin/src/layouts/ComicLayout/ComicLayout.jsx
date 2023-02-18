import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { SubNavigator } from "components";
import { COMIC_MENU } from "constants/menu.constant";
import { Footer, Header } from "layouts/components";
import styles from "./assets/styles/ComicLayout.module.scss";

const cx = classNames.bind(styles);

function ComicLayout({ children }) {
  return (
    <>
      <Header />
      <div className={cx("content", "skip-header", "comic")}>
        <SubNavigator menu={COMIC_MENU} />
        {children}
      </div>
      <Footer />
    </>
  );
}

ComicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ComicLayout;
