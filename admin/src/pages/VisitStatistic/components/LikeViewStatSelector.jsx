import classNames from "classnames/bind";
import { Select } from "components";
import PropTypes from "prop-types";
import styles from "../styles/VisitStatistic.module.scss";

const cx = classNames.bind(styles);

function LikeViewStatSelector({ selectedYear, onChangeYear, yearOptions }) {
  return (
    <div className={cx("selector-container")}>
      <h4>Thống kê tổng lượt thích và xem</h4>
      <Select
        className={cx("select")}
        options={yearOptions}
        value={selectedYear}
        setValue={onChangeYear}
        searchable
        height={30}
      />
    </div>
  );
}

LikeViewStatSelector.propTypes = {
  yearOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedYear: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onChangeYear: PropTypes.func.isRequired,
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

LikeViewStatSelector.defaultProps = {
  selectedTitle: undefined,
};

export default LikeViewStatSelector;
