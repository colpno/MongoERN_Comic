import PropTypes from "prop-types";

function MyTitleHeader({ cx, totalTitle }) {
  return (
    <span className={cx("my-title__header__total")}>
      Tổng số truyện: <span className={cx("my-title__header__total__number")}>{totalTitle}</span>
    </span>
  );
}

MyTitleHeader.propTypes = {
  cx: PropTypes.func.isRequired,
  totalTitle: PropTypes.number.isRequired,
};

export default MyTitleHeader;
