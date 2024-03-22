import { Logo } from "assets/images/index.js";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

function Image({ src, alt, handleError, className, cn, width, height }) {
  const [loaded, setLoaded] = useState(false);

  const handleOnError = (e) => {
    e.target.onError = null;
    e.target.src = Logo;
    handleError(e);
  };

  return (
    <div
      className={cx("image-wrapper", className)}
      style={{ width: width !== 0 && width, height: height !== 0 && height }}
    >
      <img
        src={loaded ? src : Logo}
        alt={alt}
        onError={handleOnError}
        onLoad={() => setLoaded(true)}
        className={(cx("image"), cn("image"))}
      />
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
