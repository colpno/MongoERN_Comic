import classNames from "classnames/bind";
import { Button } from "components/index.jsx";
import PropTypes from "prop-types";
import { memo } from "react";
import styles from "../styles/Popup.module.scss";

const cx = classNames.bind(styles);

function PopupButtonGroup({ variation, onConfirm, onCancel }) {
  if (variation === "confirm") {
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

  return (
    <Button primary onClick={onCancel}>
      Đóng
    </Button>
  );
}

PopupButtonGroup.propTypes = {
  variation: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

PopupButtonGroup.defaultProps = {
  variation: undefined,
};

export default memo(PopupButtonGroup);
