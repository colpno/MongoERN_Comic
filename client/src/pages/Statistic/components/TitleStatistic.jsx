import { LineChart } from "features";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import SelectorContainer from "./SelectorContainer";

function TitleStatistic({
  cx,
  titleSelectOptions,
  changeTitle,
  chartData,
  chartLabels,
  backgroundColors,
  borderColors,
  selectedTitle,
}) {
  return (
    <>
      <SelectorContainer
        cx={cx}
        titleLabel="Truyện"
        options={titleSelectOptions}
        handleChange={changeTitle}
        value={selectedTitle}
      />
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
  chartData: PropTypes.shape({
    views: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    likes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  changeTitle: PropTypes.func.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  backgroundColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  borderColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectedTitle: PropTypes.shape({}).isRequired,
};

export default TitleStatistic;
