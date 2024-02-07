import { LineChart } from "features";
import { useLazyGetChapterReports, useLazyGetTitleReports } from "hooks/index";
import moment from "moment";
import PropTypes from "prop-types";
import { memo, useEffect, useMemo } from "react";
import { getChartColors, getMonthArray } from "utils/constants";

function DetailReportStatChart({ selectedTitle, selectedChapter, selectedYear }) {
  const months = getMonthArray();
  const currentMonth = useMemo(() => moment().month() + 1, []);
  const arrayOfZero = useMemo(() => new Array(months.length).fill(0), [months]);
  const { backgroundColors, borderColors } = getChartColors();
  const { get: getTitleReports, data: titleReports } = useLazyGetTitleReports();
  const { get: getChapterReports, data: chapterReports } = useLazyGetChapterReports();
  const chartLabels = useMemo(() => {
    return months.map((month) => {
      if (month.number === currentMonth) return `Tháng hiện tại (${currentMonth})`;
      return `Tháng ${month.number}`;
    });
  }, [months, currentMonth]);

  const titleDatasets = useMemo(() => {
    return titleReports.reduce(
      (previousChartData, { month, like, view }) => {
        previousChartData[0].data[month - 1] += like;
        previousChartData[1].data[month - 1] += view;
        return previousChartData;
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
  }, [titleReports, arrayOfZero, backgroundColors, borderColors]);

  const chapterDatasets = useMemo(() => {
    return chapterReports.reduce(
      (previousChartData, { month, like, view }) => {
        previousChartData[0].data[month - 1] += like;
        previousChartData[1].data[month - 1] += view;
        return previousChartData;
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
  }, [chapterReports, arrayOfZero, backgroundColors, borderColors]);

  useEffect(() => {
    if (selectedTitle?.value && selectedYear?.value) {
      getTitleReports({
        year: selectedYear.value,
        title_id: selectedTitle.value,
      });
    }
  }, [selectedTitle, selectedYear]);

  useEffect(() => {
    if (selectedChapter?.value && selectedYear?.value) {
      getChapterReports({
        year: selectedYear.value,
        chapter_id: selectedChapter.value,
      });
    }
  }, [selectedChapter, selectedYear]);

  return (
    <>
      <LineChart beginAtZero labels={chartLabels} datasets={titleDatasets} title="Truyện" />
      <LineChart beginAtZero labels={chartLabels} datasets={chapterDatasets} title="Chương" />
    </>
  );
}

DetailReportStatChart.propTypes = {
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  selectedChapter: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  selectedYear: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

DetailReportStatChart.defaultProps = {
  selectedTitle: undefined,
  selectedChapter: undefined,
};

export default memo(DetailReportStatChart);
