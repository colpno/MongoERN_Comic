import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { memo } from "react";

import styles from "./FloatingContainer.module.scss";

const cx = classNames.bind(styles);

function FloatingContainer({ children, className }) {
  return (
    <div className={`${cx("floating-container")}${className && ` ${className}`}`}>{children}</div>
  );
}

FloatingContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FloatingContainer.defaultProps = {
  className: "",
};

export default memo(FloatingContainer);
