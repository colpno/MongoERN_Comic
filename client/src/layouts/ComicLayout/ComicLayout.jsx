import classNames from "classnames/bind";
import PropTypes from "prop-types";

import SubNavigator from "components/SubNavigator";
import { subNavMenu } from "constants/comicLayout.constant";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./assets/styles/ComicLayout.module.scss";

const cx = classNames.bind(styles);

function ComicLayout({ children }) {
  return (
    <>
      <Header />
      <div className={cx("content", "skip-header", "comic")}>
        <SubNavigator menu={subNavMenu} />
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
