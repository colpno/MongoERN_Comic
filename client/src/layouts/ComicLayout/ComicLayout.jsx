/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import SubNavigator from "layouts/components/SubNavigator";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./assets/styles/ComicLayout.module.scss";

const cx = classNames.bind(styles);

function ComicLayout({ children }) {
  const menu = [
    { href: "/comic/weekly", label: "Cập nhật hàng tuần" },
    { href: "/comic/ranking", label: "Bảng xếp hạng" },
    { href: "/comic/complete", label: "Truyện đẫ hết" },
  ];

  return (
    <>
      <Header />
      <div className={cx("content", "skip-header", "comic")}>
        {/* <SubNavigator menu={menu} /> */}
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
