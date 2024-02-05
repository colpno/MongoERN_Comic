import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import { Button, Scrollbar } from "components";
import { Dialog } from "features";
import styles from "./styles/Popup.module.scss";

const cx = classNames.bind(styles);

function ButtonGroup({ variation, onConfirm, onCancel }) {
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

function Popup(props) {
  const { data, trigger, variation, onConfirm, onCancel, sx, centerContent } = props;
  const { title, content } = data;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!data.isTriggered) return <></>;

  const handleConfirm = () => {
    if (data.onConfirm) {
      data.onConfirm();
    } else {
      onConfirm();
    }

    trigger(false);
  };

  const handleCancel = () => {
    if (data.onCancel) {
      data.onCancel();
    } else {
      onCancel();
    }

    trigger(false);
  };

  const handleClickOutside = () => {
    trigger(false);
  };

  return (
    <Dialog handleClickOutside={handleClickOutside}>
      <div className={cx("popup")} style={sx}>
        {title && (
          <div className={cx("title")}>
            <span>{title}</span>
          </div>
        )}
        <Scrollbar yAxis className={cx("content", [centerContent])}>
          {content}
        </Scrollbar>
        <div className={cx("btn-container")}>
          <ButtonGroup
            variation={variation || data.variation}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </Dialog>
  );
}

Popup.propTypes = {
  data: PropTypes.shape({
    isTriggered: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    variation: PropTypes.oneOf(["confirm", "normal"]),
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
  }).isRequired,
  trigger: PropTypes.func.isRequired,
  variation: PropTypes.oneOf(["confirm", "normal", undefined]),
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  sx: PropTypes.shape({}),
  centerContent: PropTypes.bool,
};

Popup.defaultProps = {
  variation: undefined,
  onConfirm: () => {},
  onCancel: () => {},
  sx: {
    width: "400px",
  },
  centerContent: false,
};

ButtonGroup.propTypes = {
  variation: PropTypes.oneOf(["confirm", "normal"]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default memo(Popup);
