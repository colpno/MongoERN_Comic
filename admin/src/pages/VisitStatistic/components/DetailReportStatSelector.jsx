import classNames from "classnames/bind";
import { Select } from "components";
import PropTypes from "prop-types";
import styles from "../styles/VisitStatistic.module.scss";

const cx = classNames.bind(styles);

function DetailReportStatSelector({
  selectedYear,
  selectedTitle,
  selectedChapter,
  onChangeYear,
  onChangeTitle,
  onChangeChapter,
  yearOptions,
  titleOptions,
  chapterOptions,
}) {
  return (
    <div className={cx("detail-selector-container")}>
      {titleOptions.length > 0 && (
        <div>
          <Select
            className={cx("select")}
            options={titleOptions}
            value={selectedTitle ?? titleOptions[0]}
            setValue={onChangeTitle}
            searchable
            height={30}
          />
        </div>
      )}
      {chapterOptions.length > 0 && (
        <div>
          <Select
            className={cx("select")}
            options={chapterOptions}
            value={selectedChapter ?? chapterOptions[0]}
            setValue={onChangeChapter}
            searchable
            height={30}
          />
        </div>
      )}
      <div>
        <Select
          className={cx("select")}
          options={yearOptions}
          value={selectedYear}
          setValue={onChangeYear}
          searchable
          height={30}
        />
      </div>
    </div>
  );
}

DetailReportStatSelector.propTypes = {
  selectedYear: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  selectedChapter: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),

  onChangeYear: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeChapter: PropTypes.func.isRequired,

  yearOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  titleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
  chapterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
};

DetailReportStatSelector.defaultProps = {
  selectedTitle: undefined,
  selectedChapter: undefined,

  titleOptions: [],
  chapterOptions: [],
};

export default DetailReportStatSelector;
