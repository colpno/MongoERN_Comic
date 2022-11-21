import PropTypes from "prop-types";
import { memo } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ labels, datasets, options, width, height }) {
  return (
    <div style={{ width, height }}>
      <Line
        data={{ labels, datasets }}
        options={{
          ...options,
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
  options: PropTypes.shape({}),
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
};

LineChart.defaultProps = {
  options: {},
  width: "100%",
  height: "100%",
};

export default memo(LineChart);
