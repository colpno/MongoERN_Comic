import classNames from "classnames/bind";
import { Select } from "components";
import PropTypes from "prop-types";
import styles from "../styles/Statistic.module.scss";

export const cx = classNames.bind(styles);

function TitleStatisticSelectors({
  titleOptions,
  yearOptions,
  selectedTitle,
  selectedYear,
  onChangeTitle,
  onChangeYear,
}) {
  return (
    <div className={cx("selector-container")}>
      <h4>Truyện:</h4>
      <Select
        className={cx("select")}
        options={titleOptions}
        value={selectedTitle}
        setValue={onChangeTitle}
        searchable
        height={30}
      />
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

TitleStatisticSelectors.propTypes = {
  titleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  yearOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  selectedYear: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeYear: PropTypes.func.isRequired,
};

export default TitleStatisticSelectors;
