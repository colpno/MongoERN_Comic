import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import { Scrollbar } from "components";
import { Dialog } from "features";
import PopButton from "./components/PopButton";
import styles from "./styles/Popup.module.scss";

const cx = classNames.bind(styles);

function Popup({ data, setShow, width, center }) {
  const { title, content, type, onConfirm, onCancel } = data;

  const handleConfirm = () => {
    onConfirm && onConfirm();
    setShow(false);
  };

  const handleCancel = () => {
    onCancel && onCancel();
    setShow(false);
  };

  const handleClickOutside = () => {
    setShow(false);
  };

  return (
    <Dialog handleClickOutside={handleClickOutside}>
      <div className={cx("popup")} style={{ width: `${width}px` }}>
        {title && (
          <div className={cx("title")}>
            <span>{title}</span>
          </div>
        )}
        <Scrollbar yAxis className={cx("content", [center])}>
          {content}
        </Scrollbar>
        <div className={cx("btn-container")}>
          <PopButton type={type} onConfirm={handleConfirm} onCancel={handleCancel} />
        </div>
      </div>
    </Dialog>
  );
}

Popup.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.oneOf(["confirm", "normal"]),
    isShown: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
  }),
  setShow: PropTypes.func.isRequired,

  width: PropTypes.number,
  center: PropTypes.bool,
};

Popup.defaultProps = {
  data: {
    title: "",
    content: "",
    type: "normal",
    onConfirm: () => {},
    onCancel: () => {},
  },
  width: 400,
  center: false,
};

export default memo(Popup);
