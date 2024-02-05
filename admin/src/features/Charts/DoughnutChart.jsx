import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({ data, options, width, height }) {
  return (
    <div style={{ width, height }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

DoughnutChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
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

DoughnutChart.defaultProps = {
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

export default DoughnutChart;
