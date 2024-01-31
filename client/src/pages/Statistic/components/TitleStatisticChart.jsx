import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { LineChart } from "features";
import { getChartColors } from "utils/constants.js";

function TitleStatisticChart({ chartLabels, chartData }) {
  const { backgroundColors, borderColors } = getChartColors();

  return (
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
  );
}

TitleStatisticChart.propTypes = {
  chartLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  chartData: PropTypes.shape({
    likes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    views: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
};

export default TitleStatisticChart;
