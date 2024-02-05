import PropTypes from "prop-types";
import { useMemo } from "react";

import { convertTimeLabel, DAYS_OF_WEEK } from "constants/time.constant";
import { BarChart } from "features";
import { getChartColors } from "utils/constants";

function StatTitleReleaseDay({ titles }) {
  const daysOfWeek = useMemo(() => DAYS_OF_WEEK.map((day) => day.shortLabel), []);
  const chartData = useMemo(() => {
    return titles.reduce(
      (result, title) => {
        const day = convertTimeLabel(title.release_day, "shortLabel", "number");
        result.datasets[0].data[day]++;
        return result;
      },
      {
        labels: daysOfWeek,
        datasets: [
          {
            label: "Số lượng truyện theo ngày",
            data: Array(7).fill(0),
            backgroundColor: getChartColors().backgroundColors.slice(13, 20),
          },
        ],
      }
    );
  }, [titles]);

  return <BarChart data={chartData} />;
}

StatTitleReleaseDay.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default StatTitleReleaseDay;
