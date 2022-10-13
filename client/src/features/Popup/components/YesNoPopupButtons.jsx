import PropTypes from "prop-types";

function YesNoPopupButtons({ cx, popup, setPopup }) {
  const handleConfirm = (isConfirm) => {
    setPopup({ ...popup, trigger: false, isConfirm });
  };

  return (
    <>
      <button
        type="button"
        className={cx("popup__confirm__btn-accept")}
        onClick={() => handleConfirm(true)}
      >
        Đồng ý
      </button>
      <button
        type="button"
        className={cx("popup__confirm__btn-close")}
        onClick={() => handleConfirm(false)}
      >
        Đóng
      </button>
    </>
  );
}

YesNoPopupButtons.propTypes = {
  cx: PropTypes.func.isRequired,
  popup: PropTypes.shape({
    trigger: PropTypes.bool.isRequired,
    isConfirm: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
};

export default YesNoPopupButtons;
