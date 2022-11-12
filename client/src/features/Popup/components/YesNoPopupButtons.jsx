import { Button } from "components";
import PropTypes from "prop-types";

function YesNoPopupButtons({ cx, setPopup }) {
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
        gray
        className={cx("popup__confirm__btn-close")}
        onClick={() => handleClick(false)}
      >
        Đóng
      </Button>
    </>
  );
}

YesNoPopupButtons.propTypes = {
  cx: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
};

export default YesNoPopupButtons;
