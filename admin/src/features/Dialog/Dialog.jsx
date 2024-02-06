import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Dialog.module.scss";

const cx = classNames.bind(styles);

function Dialog({ children, handleClickOutside }) {
  return (
    <div className={cx("background")} onClick={handleClickOutside}>
      <div className={cx("dialog")}>{children}</div>
    </div>
  );
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  handleClickOutside: PropTypes.func.isRequired,
};

export default Dialog;
