import { useTheme } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ data, width, height, title, legend }) {
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
  legend: PropTypes.shape({
    display: PropTypes.bool,
  }),
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
};

DoughnutChart.defaultProps = {
  options: {
    plugins: {
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

export default DoughnutChart;
