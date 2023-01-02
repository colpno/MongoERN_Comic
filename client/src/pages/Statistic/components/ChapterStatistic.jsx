import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import { Select } from "components";
import { LineChart } from "features";

function ChapterStatistic({
  cx,

  chapterSelectOptions,
  selectedChapter,
  changeChapter,

  yearOptions,
  changeYear,
  selectedYear,

  chartData,
  chartLabels,
  backgroundColors,
  borderColors,
}) {
  return (
    <>
      <div className={cx("selector-container")}>
        <h4>Chương:</h4>
        <Select
          className={cx("select")}
          options={chapterSelectOptions}
          value={selectedChapter}
          setValue={changeChapter}
          searchable
          height={30}
        />
        <Select
          className={cx("select")}
          options={yearOptions}
          value={selectedYear}
          setValue={changeYear}
          searchable
          height={30}
        />
      </div>
      <Row>
        <Col xs={12} md={6}>
          <LineChart
            beginAtZero
            labels={chartLabels}
            datasets={[
              {
                label: "Lượt xem",
                data: chartData.views,
                backgroundColor: backgroundColors[6],
                borderColor: borderColors[6],
              },
            ]}
          />
        </Col>
        <Col xs={12} md={6}>
          <LineChart
            beginAtZero
            labels={chartLabels}
            datasets={[
              {
                label: "Lượt thích",
                data: chartData.likes,
                backgroundColor: backgroundColors[7],
                borderColor: borderColors[7],
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
}

ChapterStatistic.propTypes = {
  cx: PropTypes.func.isRequired,

  chapterSelectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedChapter: PropTypes.shape({}).isRequired,
  changeChapter: PropTypes.func.isRequired,

  yearOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  changeYear: PropTypes.func.isRequired,
  selectedYear: PropTypes.shape({}).isRequired,

  chartData: PropTypes.shape({
    views: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    likes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  backgroundColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  borderColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ChapterStatistic;
