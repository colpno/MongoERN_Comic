import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Dialog.module.scss";

const cx = classNames.bind(styles);

function Dialog({ children, onClickOutside }) {
  return (
    <div className={cx("dialog")}>
      {children}
      <div className={cx("background")} onClick={onClickOutside} />
    </div>
  );
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

export default Dialog;
