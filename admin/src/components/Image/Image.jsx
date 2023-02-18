import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

function Image({ src, alt, handleError, className, cn, width, height }) {
  return (
    <div
      className={cx("image-wrapper", className)}
      style={{ width: width !== 0 && width, height: height !== 0 && height }}
    >
      <img src={src} alt={alt} onError={handleError} className={(cx("image"), cn("image"))} />
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleError: PropTypes.func,
  className: PropTypes.string,
  cn: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
};

Image.defaultProps = {
  width: 0,
  height: 0,
  cn: () => {},
  className: "",
  handleError: () => {},
};

export default Image;
