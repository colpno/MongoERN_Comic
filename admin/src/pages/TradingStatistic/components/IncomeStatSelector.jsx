import classNames from "classnames/bind";
import { Select } from "components";
import PropTypes from "prop-types";
import styles from "../styles/TradingStatistic.module.scss";

const cx = classNames.bind(styles);

function IncomeStatSelector({ yearOptions, selectedYear, onChangeYear }) {
  return (
    <div className={cx("selector-container")}>
      <h4>Thu nhập của hệ thống</h4>
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

IncomeStatSelector.propTypes = {
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
};

export default IncomeStatSelector;
