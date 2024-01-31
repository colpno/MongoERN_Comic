import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { NoData } from "features";
import { useLazyGetTitleReports } from "hooks/index.jsx";
import moment from "moment";
import { memo, useEffect, useMemo, useState } from "react";
import { getMonthArray } from "utils/constants.js";
import getYearOptions from "utils/getYearOptions.js";
import styles from "../styles/Statistic.module.scss";
import TitleStatisticChart from "./TitleStatisticChart";
import TitleStatisticSelectors from "./TitleStatisticSelectors";

export const cx = classNames.bind(styles);

function TitleStatistic({ titles, selectedTitle, setSelectedTitle }) {
  const months = getMonthArray();
  const currentMonth = useMemo(() => moment().month() + 1, []);
  const arrayOfZero = useMemo(() => new Array(months.length).fill(0), []);
  const yearOptions = getYearOptions();
  const { get: getTitleReports, data: titleReports = [] } = useLazyGetTitleReports();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [chartData, setChartData] = useState({
    likes: [...arrayOfZero],
    views: [...arrayOfZero],
  });
  const chartLabels = useMemo(
    () =>
      months.map((month) => {
        if (month.number === currentMonth) return `Tháng hiện tại (${currentMonth})`;
        return `Tháng ${month.number}`;
      }),
    []
  );
  const titleOptions = useMemo(() => {
    if (titles.length > 0) {
      return titles.reduce((options, title) => {
        return [
          ...options,
          {
            value: title._id,
            label: title.title,
          },
        ];
      }, []);
    }
    return [];
  }, [titles]);
  const hasData = titleOptions.length > 0 && selectedTitle?.value;

  if (!hasData) {
    return (
      <NoData>
        <h5>Hiện tại chưa có dữ liệu để thống kê!</h5>
        <small>Vui lòng quay lại sau nhé!</small>
      </NoData>
    );
  }

  useEffect(() => {
    if (selectedTitle?.value) {
      getTitleReports({
        title_id: selectedTitle.value,
        year: selectedYear.value,
      });
    }
  }, [selectedTitle, selectedYear]);

  useEffect(() => {
    const newChartData = titleReports.reduce(
      (previousData, { like, view, month }) => {
        const currentData = { ...previousData };

        currentData.likes[month - 1] += like;
        currentData.views[month - 1] += view;

        return currentData;
      },
      {
        likes: [...arrayOfZero],
        views: [...arrayOfZero],
      }
    );

    setChartData(newChartData);
  }, [titleReports]);

  return (
    <>
      <TitleStatisticSelectors
        titleOptions={titleOptions}
        yearOptions={yearOptions}
        selectedTitle={selectedTitle || titleOptions[0]}
        selectedYear={selectedYear}
        onChangeTitle={setSelectedTitle}
        onChangeYear={setSelectedYear}
      />
      <TitleStatisticChart chartLabels={chartLabels} chartData={chartData} />
    </>
  );
}

TitleStatistic.propTypes = {
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedTitle: PropTypes.func.isRequired,
};

export default memo(TitleStatistic);
