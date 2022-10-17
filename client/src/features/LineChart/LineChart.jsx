import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

function LineChart({ labels, datasets, width, height }) {
  return (
    <div style={{ width, height }}>
      <Line data={{ labels, datasets }} />
    </div>
  );
}

LineChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      backgroundColor: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      ]),
      borderColor: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      ]),
    }).isRequired
  ).isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

LineChart.defaultProps = {
  width: "100%",
  height: "100%",
};

export default LineChart;
