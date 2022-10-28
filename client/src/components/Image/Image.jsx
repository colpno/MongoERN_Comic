import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

function Image({ src, alt, className }) {
  return (
    <div className={cx("image-wrapper")}>
      <img src={src} alt={alt} className={cx("image", className)} />
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Image;
