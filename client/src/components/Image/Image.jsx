import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

function Image({ src, alt, className, width, height }) {
  return (
    <div className={cx("image-wrapper", className)} style={{ width, height }}>
      <img src={src} alt={alt} className={cx("image")} />
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Image.defaultProps = {
  width: 50,
  height: 50,
  className: "",
};

export default Image;
