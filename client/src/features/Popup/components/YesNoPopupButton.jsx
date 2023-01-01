import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Button } from "components";
import styles from "../styles/YesNoPopupButton.module.scss";

const cx = classNames.bind(styles);

function YesNoPopupButton({ setPopup }) {
  const handleClick = (isConfirm) => {
    setPopup((prev) => ({ ...prev, trigger: false, isConfirm }));
  };

  return (
    <>
      <Button
        primary
        className={cx("popup__confirm__btn-accept")}
        onClick={() => handleClick(true)}
      >
        Đồng ý
      </Button>
      <Button
        outline
        grey
        className={cx("popup__confirm__btn-close")}
        onClick={() => handleClick(false)}
      >
        Đóng
      </Button>
    </>
  );
}

YesNoPopupButton.propTypes = {
  setPopup: PropTypes.func.isRequired,
};

export default YesNoPopupButton;
