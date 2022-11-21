import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Scrollbar.module.scss";

const cx = classNames.bind(styles);

function Scrollbar(props) {
  const { children } = props;
  return <div className={cx("scrollbar")}>{children}</div>;
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Scrollbar;
