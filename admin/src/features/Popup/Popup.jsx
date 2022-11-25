import classNames from "classnames/bind";
import PropTypes from "prop-types";

import Button from "components/Button";
import { Dialog } from "features";
import styles from "./assets/styles/Popup.module.scss";
import YesNoPopupButtons from "./components/YesNoPopupButtons";

const cx = classNames.bind(styles);

function Popup({ popup, setPopup, yesno, width }) {
  const { title, content, trigger } = popup;

  const handleClose = () => {
    setPopup((prev) => ({ ...prev, trigger: false, isClosed: true }));
  };

  let Component = (
    <Button primary className={cx("popup__btn-close")} onClick={handleClose}>
      Đóng
    </Button>
  );

  if (yesno) {
    Component = <YesNoPopupButtons cx={cx} popup={popup} setPopup={setPopup} />;
  }

  const handleClickOutside = () => {
    setPopup((prev) => ({
      ...prev,
      trigger: false,
      isConfirm: false,
      isClosed: true,
    }));
  };

  return (
    trigger && (
      <Dialog onClickOutside={handleClickOutside}>
        <div className={cx("popup")} style={{ width: `${width}px` }}>
          <div className={cx("popup__head")}>
            <span>{title}</span>
          </div>
          <div className={cx("popup__content")}>{content}</div>
          <div className={cx("popup__btn-container")}>{Component}</div>
        </div>
      </Dialog>
    )
  );
}

Popup.propTypes = {
  popup: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    trigger: PropTypes.bool.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
  yesno: PropTypes.bool,
  width: PropTypes.number,
};

Popup.defaultProps = {
  yesno: false,
  width: 400,
};

export default Popup;
