import classNames from "classnames/bind";
import { Select } from "components";
import PropTypes from "prop-types";
import styles from "../styles/VisitStatistic.module.scss";

const cx = classNames.bind(styles);

function ChapterReportStatSelector({
  yearOptions,
  selectedYear,
  onChangeYear,
  selectedChapter,
  onChangeChapter,
  reportOptions,
}) {
  return (
    <div className={cx("selector-container")}>
      <h4>Thống kê thông số chương</h4>
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
          value={selectedChapter ?? reportOptions[0]}
          setValue={onChangeChapter}
          searchable
          height={30}
        />
      )}
    </div>
  );
}

ChapterReportStatSelector.propTypes = {
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
  selectedChapter: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onChangeChapter: PropTypes.func.isRequired,
  reportOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
};

ChapterReportStatSelector.defaultProps = {
  selectedChapter: undefined,
  reportOptions: [],
};

export default ChapterReportStatSelector;
