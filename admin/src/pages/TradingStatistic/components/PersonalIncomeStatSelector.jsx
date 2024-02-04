import classNames from "classnames/bind";
import { Select } from "components";
import PropTypes from "prop-types";
import styles from "../styles/TradingStatistic.module.scss";

const cx = classNames.bind(styles);

function PersonalIncomeStatSelector({
  yearOptions,
  selectedYear,
  onChangeYear,
  selectedUser,
  onChangeUser,
  userOptions,
}) {
  return (
    <div className={cx("selector-container")}>
      <h4>Thu nhập cá nhân</h4>
      <Select
        className={cx("select")}
        options={yearOptions}
        value={selectedYear}
        setValue={onChangeYear}
        searchable
        height={30}
      />
      {userOptions.length > 0 && (
        <Select
          className={cx("select")}
          options={userOptions}
          value={selectedUser ?? userOptions[0]}
          setValue={onChangeUser}
          searchable
          height={30}
        />
      )}
    </div>
  );
}

PersonalIncomeStatSelector.propTypes = {
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
  selectedUser: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onChangeUser: PropTypes.func.isRequired,
  userOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

PersonalIncomeStatSelector.defaultProps = {
  selectedUser: undefined,
};

export default PersonalIncomeStatSelector;
