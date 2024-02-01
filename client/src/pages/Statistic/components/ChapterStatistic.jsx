import { NoData } from "features/index.jsx";
import { useLazyGetChapterReports, useLazyGetChapters } from "hooks/index.jsx";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { getMonthArray } from "utils/constants.js";
import getYearOptions from "utils/getYearOptions.js";
import ChapterStatisticCharts from "./ChapterStatisticCharts.jsx";
import ChapterStatisticSelectors from "./ChapterStatisticSelectors.jsx";

function ChapterStatistic({ selectedTitle }) {
  const yearOptions = getYearOptions();
  const months = getMonthArray();
  const currentMonth = useMemo(() => moment().month() + 1, []);
  const arrayOfZero = useMemo(() => new Array(months.length).fill(0), []);
  const [selectedChapter, setSelectedChapter] = useState();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const { get: getChapters, data: chapters = [] } = useLazyGetChapters();
  const { get: getChapterReports, data: chapterReports = [] } = useLazyGetChapterReports();
  const chartData = useMemo(() => {
    return chapterReports.reduce(
      (previousChartData, { like, view, month }) => {
        const currentChartData = { ...previousChartData };

        currentChartData.likes[month - 1] += like;
        currentChartData.views[month - 1] += view;

        return currentChartData;
      },
      {
        likes: [...arrayOfZero],
        views: [...arrayOfZero],
      }
    );
  }, [chapterReports]);
  const chartLabels = useMemo(() => {
    return months.map((month) =>
      month.number === currentMonth ? `Tháng hiện tại (${currentMonth})` : `Tháng ${month.number}`
    );
  }, [months, currentMonth]);
  const chapterOptions = useMemo(() => {
    return chapters.length > 0
      ? chapters.reduce(
          (options, chapter) => [
            ...options,
            {
              value: chapter._id,
              label: `Chương ${chapter.order}`,
            },
          ],
          []
        )
      : [];
  }, [chapters]);
  const hasData = chapterOptions.length > 0;

  const fetchChapters = (params) => {
    params._fields = "order";
    params._embed = JSON.stringify([
      { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
    ]);

    getChapters({ params });
  };

  useEffect(() => {
    if (!selectedChapter) setSelectedChapter(chapterOptions[0]);
  }, [chapterOptions]);

  useEffect(() => {
    if (selectedTitle?.value) fetchChapters({ title_id: selectedTitle.value });
  }, [selectedTitle]);

  useEffect(() => {
    if (selectedChapter?.value) {
      getChapterReports({
        chapter_id: selectedChapter.value,
        year: selectedYear.value,
      });
    }
  }, [selectedChapter, selectedYear]);

  if (!hasData) {
    return (
      <NoData>
        <h5>Truyện không có chương nào để thống kê</h5>
      </NoData>
    );
  }

  return (
    <>
      <ChapterStatisticSelectors
        chapterOptions={chapterOptions}
        yearOptions={yearOptions}
        selectedChapter={selectedChapter}
        selectedYear={selectedYear}
        onChangeChapter={setSelectedChapter}
        onChangeYear={setSelectedYear}
      />
      <ChapterStatisticCharts chartLabels={chartLabels} chartData={chartData} />
    </>
  );
}

ChapterStatistic.propTypes = {
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChapterStatistic;
