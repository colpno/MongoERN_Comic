import classNames from "classnames/bind";
import Button from "components/Button";
import { Dialog } from "components/Dialog";
import PropTypes from "prop-types";
import styles from "./assets/styles/Popup.module.scss";
import YesNoPopupButtons from "./components/YesNoPopupButtons";

const cx = classNames.bind(styles);

function Popup({ popup, setPopup, yesno, size }) {
  const { title, content, trigger } = popup;
  let Component = (
    <Button
      className={cx("popup__btn-close")}
      onClick={() => setPopup({ ...popup, trigger: false })}
    >
      Đóng
    </Button>
  );

  if (yesno) {
    Component = <YesNoPopupButtons cx={cx} popup={popup} setPopup={setPopup} />;
  }

  return (
    trigger && (
      <Dialog
        onClickOutside={() =>
          setPopup({
            ...popup,
            trigger: false,
            isConfirm: false,
          })
        }
      >
        <div className={cx("popup")} style={{ width: `${size}px` }}>
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
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    trigger: PropTypes.bool.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
  yesno: PropTypes.bool,
  size: PropTypes.number,
};

Popup.defaultProps = {
  yesno: false,
  size: 400,
};

export default Popup;
