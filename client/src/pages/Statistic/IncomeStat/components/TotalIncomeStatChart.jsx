import { LineChart } from "features";
import { useLazyGetIncomeReports } from "hooks/index.jsx";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getChartColors, getMonthArray } from "utils/constants.js";

function TotalIncomeStatChart({ selectedYear }) {
  const months = getMonthArray();
  const currentMonth = useMemo(() => moment().month() + 1, []);
  const arrayOfZero = useMemo(() => new Array(months.length).fill(0), [months]);
  const user = useSelector((state) => state.user.user);
  const { backgroundColors, borderColors } = getChartColors();
  const { get: getReports, data: reports = [] } = useLazyGetIncomeReports();
  const chartLabels = useMemo(() => {
    return months.map((month) => {
      if (month.number === currentMonth) return `Tháng hiện tại (${currentMonth})`;
      return `Tháng ${month.number}`;
    });
  }, [months, currentMonth]);
  const datasets = useMemo(() => {
    return reports.reduce(
      (
        previousChartData,
        { month, total_income: totalIncome, purchased_chapter_income: purchasedChapterIncome }
      ) => {
        const currentChartData = [...previousChartData];
        currentChartData[0].data[month - 1] += totalIncome;
        currentChartData[1].data[month - 1] += purchasedChapterIncome;
        return currentChartData;
      },
      [
        {
          label: "Tổng thu nhập ($)",
          data: [...arrayOfZero],
          backgroundColor: backgroundColors[6],
          borderColor: borderColors[6],
          borderWidth: 3,
        },
        {
          label: "Thu nhập từ bán comic ($)",
          data: [...arrayOfZero],
          backgroundColor: backgroundColors[7],
          borderColor: borderColors[7],
          borderWidth: 3,
        },
      ]
    );
  }, [reports, arrayOfZero, backgroundColors, borderColors]);

  useEffect(() => {
    if (selectedYear?.value && user?._id) {
      getReports({
        user_id: user._id,
        year: selectedYear.value,
      });
    }
  }, [selectedYear, user]);

  return <LineChart beginAtZero labels={chartLabels} datasets={datasets} />;
}

TotalIncomeStatChart.propTypes = {
  selectedYear: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default TotalIncomeStatChart;
