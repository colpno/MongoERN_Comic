import PropTypes from "prop-types";
import { memo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ labels, datasets, width, height, beginAtZero, title }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const fontColor = isDark ? "#fff" : "#666";
  const gridColor = isDark ? "#494949" : "#ddd";

  const options = {
    interaction: {
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: title,
        color: fontColor,
      },
      legend: {
        labels: {
          color: fontColor,
        },
      },
    },
    scales: {
      yAxes: {
        min: beginAtZero ? 0 : undefined,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: fontColor,
        },
      },
      xAxes: {
        min: beginAtZero ? 0 : undefined,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: fontColor,
        },
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Line data={{ labels, datasets }} options={options} />
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
        PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired
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
  title: PropTypes.string,
};

LineChart.defaultProps = {
  options: {},
  width: "100%",
  height: "100%",
  beginAtZero: false,
  title: undefined,
};

export default memo(LineChart);
