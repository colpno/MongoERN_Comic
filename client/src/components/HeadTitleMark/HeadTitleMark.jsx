import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./HeadTitleMark.module.scss";

const cx = classNames.bind(styles);

function HeadTitleMark({ children, classname }) {
  return <div className={cx("mark", classname)}>{children}</div>;
}

HeadTitleMark.propTypes = {
  children: PropTypes.node.isRequired,
  classname: PropTypes.string,
};

HeadTitleMark.defaultProps = {
  classname: "",
};

export default HeadTitleMark;
