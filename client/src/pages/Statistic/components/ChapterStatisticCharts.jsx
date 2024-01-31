import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { LineChart } from "features";
import { getChartColors } from "utils/constants.js";

function ChapterStatisticCharts({ chartLabels, chartData }) {
  const { backgroundColors, borderColors } = getChartColors();

  return (
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
  );
}

ChapterStatisticCharts.propTypes = {
  chartLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  chartData: PropTypes.shape({
    likes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    views: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
};

export default ChapterStatisticCharts;
