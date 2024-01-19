import PropTypes from "prop-types";
import { memo, useMemo } from "react";

import { PieChart } from "features";
import { getChartColors } from "utils/constants";

function StatTitleStatus({ titles, statuses }) {
  const status = statuses.reduce(
    (result, stt) => {
      result.status.push(stt.status);
      result.code.push(stt.code);
      return result;
    },
    {
      status: [],
      code: [],
    }
  );

  const initData = Array(statuses.length).fill(0);

  const chartData = useMemo(() => {
    return titles.reduce(
      (result, title) => {
        const index = status.code.indexOf(title.status_id.code);
        result.datasets[0].data[index]++;
        return result;
      },
      {
        labels: status.status,
        datasets: [
          {
            label: "Top 10 có số bình luận cao nhất",
            data: initData,
            backgroundColor: getChartColors().backgroundColors.slice(1, 3),
          },
        ],
      }
    );
  }, [titles]);

  return <PieChart data={chartData} />;
}

StatTitleStatus.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  statuses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default memo(StatTitleStatus);
