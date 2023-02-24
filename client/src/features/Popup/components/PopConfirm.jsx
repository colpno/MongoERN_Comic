import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Button } from "components";
import styles from "../styles/PopConfirm.module.scss";

const cx = classNames.bind(styles);

function PopConfirm({ onConfirm, onCancel }) {
  return (
    <>
      <Button primary className={cx("btn--accept")} onClick={onConfirm}>
        Đồng ý
      </Button>
      <Button outline grey className={cx("btn--close")} onClick={onCancel}>
        Đóng
      </Button>
    </>
  );
}

PopConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PopConfirm;
