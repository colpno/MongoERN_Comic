import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ data, width, height, title }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const fontColor = isDark ? "#fff" : "#666";
  const gridColor = isDark ? "#666" : "#aaa";

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
        grid: {
          color: gridColor,
        },
        ticks: {
          color: fontColor,
        },
      },
      xAxes: {
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
  legend: PropTypes.shape({
    display: PropTypes.bool,
    position: PropTypes.oneOf(["top", "left", "bottom", "right"]),
    align: PropTypes.oneOf(["start", "center", "end"]),
  }),
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
};

BarChart.defaultProps = {
  options: {},
  width: "100%",
  height: "100%",
  title: undefined,
  legend: undefined,
};

export default BarChart;
