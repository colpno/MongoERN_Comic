import React from "react";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useTheme } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data, width, height, title, legend }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const fontColor = isDark ? "#fff" : "#666";

  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
        color: fontColor,
      },
      legend: {
        ...legend,
        labels: {
          color: fontColor,
        },
      },
    },
  };

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
  legend: PropTypes.shape({
    display: PropTypes.bool,
    position: PropTypes.oneOf(["top", "left", "bottom", "right"]),
    align: PropTypes.oneOf(["start", "center", "end"]),
  }),
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
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
  legend: undefined,
  width: "100%",
  height: "100%",
  title: undefined,
};

export default PieChart;
