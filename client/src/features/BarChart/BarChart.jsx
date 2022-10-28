import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

function BarChart({ labels, datasets, width, height }) {
  return (
    <div style={{ width, height }}>
      <Bar data={{ labels, datasets }} />
    </div>
  );
}

BarChart.propTypes = {
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

BarChart.defaultProps = {
  width: "100%",
  height: "100%",
};

export default BarChart;
