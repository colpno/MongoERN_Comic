import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import { noData } from "assets/images";
import styles from "./NoData.module.scss";

const cx = classNames.bind(styles);

function NoData(props) {
  const { children, className, image } = props;

  const classes = cx("no-data", className);

  return (
    <div className={classes}>
      <img src={image} alt="No data" className={cx("image")} />
      <div className={cx("content")}>{children}</div>
    </div>
  );
}

NoData.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  image: PropTypes.node,
};

NoData.defaultProps = {
  className: "",
  image: noData,
};

export default memo(NoData);
