import PropTypes from "prop-types";
import { memo } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ labels, datasets, options, width, height, beginAtZero }) {
  let finalOptions = { ...options };
  if (beginAtZero) {
    finalOptions = {
      ...options,
      scales: {
        yAxis: {
          min: 0,
        },
      },
    };
  }

  return (
    <div style={{ width, height }}>
      <Line
        data={{ labels, datasets }}
        options={{
          ...finalOptions,
          interaction: {
            intersect: false,
          },
        }}
      />
    </div>
  );
}

LineChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  options: PropTypes.shape({
    scales: PropTypes.shape({
      yAxis: {
        min: PropTypes.number,
      },
    }),
  }),
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.number.isRequired,
          PropTypes.string.isRequired,
        ]).isRequired
      ),
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
  beginAtZero: PropTypes.bool,
};

LineChart.defaultProps = {
  options: {},
  width: "100%",
  height: "100%",
  beginAtZero: false,
};

export default memo(LineChart);
