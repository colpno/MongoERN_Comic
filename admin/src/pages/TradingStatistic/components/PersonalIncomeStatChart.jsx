import { LineChart } from "features";
import { useLazyGetIncomeReports } from "hooks/index";
import moment from "moment";
import PropTypes from "prop-types";
import { memo, useEffect, useMemo } from "react";
import { getChartColors, getMonthArray } from "utils/constants";

function PersonalIncomeStatChart({ selectedYear, selectedUser }) {
  const months = getMonthArray();
  const currentMonth = useMemo(() => moment().month() + 1, []);
  const arrayOfZero = useMemo(() => new Array(months.length).fill(0), [months]);
  const { backgroundColors, borderColors } = getChartColors();
  const { get: getReports, data: reports } = useLazyGetIncomeReports();
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
          label: "Tổng ($)",
          data: [...arrayOfZero],
          backgroundColor: borderColors[6],
          borderColor: backgroundColors[6],
          borderWidth: 3,
          fill: true,
        },
        {
          label: "Bán comic ($)",
          data: [...arrayOfZero],
          backgroundColor: borderColors[7],
          borderColor: backgroundColors[7],
          borderWidth: 3,
          fill: true,
        },
      ]
    );
  }, [reports, arrayOfZero, backgroundColors, borderColors]);

  useEffect(() => {
    if (selectedYear?.value && selectedUser?.value) {
      getReports({
        user_id: selectedUser.value,
        year: selectedYear.value,
      });
    }
  }, [selectedYear, selectedUser]);

  return (
    <LineChart beginAtZero labels={chartLabels} datasets={datasets} title="Thu nhập cá nhân" />
  );
}

PersonalIncomeStatChart.propTypes = {
  selectedYear: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  selectedUser: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

PersonalIncomeStatChart.defaultProps = {
  selectedUser: undefined,
};

export default memo(PersonalIncomeStatChart);
