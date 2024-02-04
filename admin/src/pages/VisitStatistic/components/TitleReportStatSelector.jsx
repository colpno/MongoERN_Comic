import classNames from "classnames/bind";
import { Select } from "components";
import PropTypes from "prop-types";
import styles from "../styles/VisitStatistic.module.scss";

const cx = classNames.bind(styles);

function TitleReportStatSelector({
  yearOptions,
  selectedYear,
  onChangeYear,
  selectedTitle,
  onChangeTitle,
  reportOptions,
}) {
  return (
    <div className={cx("selector-container")}>
      <h4>Thống kê thông số truyện</h4>
      <Select
        className={cx("select")}
        options={yearOptions}
        value={selectedYear}
        setValue={onChangeYear}
        searchable
        height={30}
      />
      {reportOptions.length > 0 && (
        <Select
          className={cx("select")}
          options={reportOptions}
          value={selectedTitle ?? reportOptions[0]}
          setValue={onChangeTitle}
          searchable
          height={30}
        />
      )}
    </div>
  );
}

TitleReportStatSelector.propTypes = {
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
  onChangeTitle: PropTypes.func.isRequired,
  reportOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
};

TitleReportStatSelector.defaultProps = {
  reportOptions: [],
  selectedTitle: undefined,
};

export default TitleReportStatSelector;
