import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Scrollbar.module.scss";

const cx = classNames.bind(styles);

function Scrollbar({ children, className, xAxis, yAxis }) {
  const classes = cx("scrollbar", xAxis && "x-axis", yAxis && "y-axis", className);

  return <div className={classes}>{children}</div>;
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  xAxis: PropTypes.bool,
  yAxis: PropTypes.bool,
};

Scrollbar.defaultProps = {
  className: "",
  xAxis: false,
  yAxis: false,
};

export default Scrollbar;
