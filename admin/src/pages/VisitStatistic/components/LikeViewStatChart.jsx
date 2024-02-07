import { LineChart } from "features";
import { useLazyGetTitleReports } from "hooks/index";
import moment from "moment";
import PropTypes from "prop-types";
import { memo, useEffect, useMemo } from "react";
import { getChartColors, getMonthArray } from "utils/constants";

function LikeViewStatChart({ selectedYear }) {
  const months = getMonthArray();
  const currentMonth = useMemo(() => moment().month() + 1, []);
  const arrayOfZero = useMemo(() => new Array(months.length).fill(0), [months]);
  const { backgroundColors, borderColors } = getChartColors();
  const { get: getReports, data: reports } = useLazyGetTitleReports();
  const chartLabels = useMemo(() => {
    return months.map((month) => {
      if (month.number === currentMonth) return `Tháng hiện tại (${currentMonth})`;
      return `Tháng ${month.number}`;
    });
  }, [months, currentMonth]);
  const datasets = useMemo(() => {
    return reports.reduce(
      (previousChartData, { month, like, view }) => {
        const currentChartData = [...previousChartData];
        currentChartData[0].data[month - 1] += like;
        currentChartData[1].data[month - 1] += view;
        return currentChartData;
      },
      [
        {
          label: "Số lượt thích",
          data: [...arrayOfZero],
          backgroundColor: borderColors[7],
          borderColor: backgroundColors[7],
          borderWidth: 3,
          fill: true,
        },
        {
          label: "Số lượt xem",
          data: [...arrayOfZero],
          backgroundColor: borderColors[6],
          borderColor: backgroundColors[6],
          borderWidth: 3,
          fill: true,
        },
      ]
    );
  }, [reports, arrayOfZero, backgroundColors, borderColors]);

  useEffect(() => {
    if (selectedYear?.value) {
      getReports({
        year: selectedYear.value,
      });
    }
  }, [selectedYear]);

  return <LineChart beginAtZero labels={chartLabels} datasets={datasets} />;
}

LikeViewStatChart.propTypes = {
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  selectedYear: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

LikeViewStatChart.defaultProps = {
  selectedTitle: undefined,
};

export default memo(LikeViewStatChart);
