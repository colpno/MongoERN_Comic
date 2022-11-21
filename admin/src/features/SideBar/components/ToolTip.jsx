import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "../styles/ToolTip.module.scss";

const cx = classNames.bind(styles);

function ToolTip({ position, label, x, y }) {
  const classes = cx("tooltip", [position]);

  return (
    <div className={classes} style={{ top: y, left: x }}>
      <span>{label}</span>
    </div>
  );
}

ToolTip.propTypes = {
  position: PropTypes.oneOf([
    "top-left",
    "top-center",
    "top-right",
    "left",
    "right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]).isRequired,
  label: PropTypes.string.isRequired,
  x: PropTypes.string,
  y: PropTypes.string,
};

ToolTip.defaultProps = {
  x: "",
  y: "",
};

export default ToolTip;
