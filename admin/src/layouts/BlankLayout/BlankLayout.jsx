import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./BlankLayout.module.scss";

const cx = classNames.bind(styles);

function BlankLayout({ children }) {
  return <div className={cx("content")}>{children}</div>;
}

BlankLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlankLayout;
