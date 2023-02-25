import React from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";

function PieChart({ data, options, width, height }) {
  return (
    <div style={{ width, height }}>
      <Pie data={data} options={options} />
    </div>
  );
}

PieChart.propTypes = {
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
    }),
  }),
  width: PropTypes.string,
  height: PropTypes.string,
};

PieChart.defaultProps = {
  options: {
    plugins: {
      legend: {
        display: true,
      },
      tooltips: {
        enabled: true,
      },
    },
  },
  width: "100%",
  height: "100%",
};

export default PieChart;
