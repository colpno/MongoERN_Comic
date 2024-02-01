import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Select } from "components";
import styles from "../../styles/Statistic.module.scss";

const cx = classNames.bind(styles);

function ChapterStatisticSelectors({
  chapterOptions,
  yearOptions,
  selectedChapter,
  selectedYear,
  onChangeChapter,
  onChangeYear,
}) {
  return (
    <div className={cx("selector-container")}>
      <h4>Chương:</h4>
      <Select
        className={cx("select")}
        options={chapterOptions}
        value={selectedChapter || chapterOptions[0]}
        setValue={onChangeChapter}
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

ChapterStatisticSelectors.propTypes = {
  chapterOptions: PropTypes.arrayOf(
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
  selectedChapter: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  selectedYear: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onChangeChapter: PropTypes.func.isRequired,
  onChangeYear: PropTypes.func.isRequired,
};

ChapterStatisticSelectors.defaultProps = {
  selectedChapter: { value: "", label: "" },
};

export default ChapterStatisticSelectors;
