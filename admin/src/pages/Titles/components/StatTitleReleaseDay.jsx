import PropTypes from "prop-types";
import { useMemo } from "react";

import { convertTimeLabel, DAYS_OF_WEEK } from "constants/time.constant";
import { BarChart } from "features";
import { moveArray } from "utils";
import { getChartColors } from "utils/constants";

function StatTitleReleaseDay({ titles }) {
  const initData = useMemo(() => Array(7).fill(0), []);
  const daysOfWeek = useMemo(() => DAYS_OF_WEEK.map((day) => day.shortLabel), []);

  const chartData = useMemo(() => {
    return titles.reduce(
      (result, title) => {
        if (title.approved_status_id.code === "apd" && title.status_id.code === "vis") {
          const day = convertTimeLabel(title.release_day, "shortLabel", "number");
          result.datasets[0].data[day]++;
        }
        return result;
      },
      {
        labels: daysOfWeek,
        datasets: [
          {
            label: "Số truyện chưa hoàn thành đăng vào các ngày trong tuần",
            data: initData,
            backgroundColor: getChartColors().backgroundColors.slice(13, 20),
          },
        ],
      }
    );
  }, []);
  moveArray(chartData.datasets[0].data, 0, 6);

  return <BarChart data={chartData} />;
}

StatTitleReleaseDay.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default StatTitleReleaseDay;