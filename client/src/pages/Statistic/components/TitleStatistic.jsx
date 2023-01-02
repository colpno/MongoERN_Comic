import PropTypes from "prop-types";
import { Row } from "react-bootstrap";

import { Select } from "components";
import { LineChart } from "features";

function TitleStatistic({
  cx,

  titleSelectOptions,
  selectedTitle,
  changeTitle,

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
        <h4>Truyện:</h4>
        <Select
          className={cx("select")}
          options={titleSelectOptions}
          value={selectedTitle}
          setValue={changeTitle}
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
        <LineChart
          beginAtZero
          labels={chartLabels}
          datasets={[
            {
              label: "Lượt xem",
              data: chartData.views,
              backgroundColor: backgroundColors[6],
              borderColor: borderColors[6],
              borderWidth: 3,
            },
            {
              label: "Lượt thích",
              data: chartData.likes,
              backgroundColor: backgroundColors[7],
              borderColor: borderColors[7],
              borderWidth: 3,
            },
          ]}
        />
      </Row>
    </>
  );
}

TitleStatistic.propTypes = {
  cx: PropTypes.func.isRequired,

  titleSelectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedTitle: PropTypes.shape({}).isRequired,
  changeTitle: PropTypes.func.isRequired,

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

export default TitleStatistic;
