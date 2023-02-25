import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

function BarChart({ data, width, height, options }) {
  return (
    <div style={{ width, height }}>
      <Bar data={data} options={options} />
    </div>
  );
}

BarChart.propTypes = {
  data: PropTypes.shape({
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
  }).isRequired,
  options: PropTypes.shape({
    plugins: PropTypes.shape({
      legend: PropTypes.shape({
        display: PropTypes.bool,
      }),
      tooltips: PropTypes.shape({
        enabled: PropTypes.bool,
      }),
      indexAxis: PropTypes.oneOf(["y", undefined]),
    }),
  }),
  width: PropTypes.string,
  height: PropTypes.string,
};

BarChart.defaultProps = {
  options: {},
  width: "100%",
  height: "100%",
};

export default BarChart;
