import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./HeadTitleMark.module.scss";

const cx = classNames.bind(styles);

function HeadTitleMark({ children }) {
  return <div className={cx("mark")}>{children}</div>;
}

HeadTitleMark.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeadTitleMark;
