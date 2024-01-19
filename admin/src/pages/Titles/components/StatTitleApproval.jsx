import PropTypes from "prop-types";
import { memo, useMemo } from "react";

import { PieChart } from "features";
import { getChartColors } from "utils/constants";

function StatTitleApproval({ titles, approvedStatuses }) {
  const status = approvedStatuses.reduce(
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

  const initData = Array(approvedStatuses.length).fill(0);

  const chartData = useMemo(() => {
    return titles.reduce(
      (result, title) => {
        const index = status.code.indexOf(title.approved_status_id.code);
        result.datasets[0].data[index]++;
        return result;
      },
      {
        labels: status.status,
        datasets: [
          {
            label: "",
            data: initData,
            backgroundColor: getChartColors().backgroundColors.slice(3, 6),
          },
        ],
      }
    );
  }, [titles]);

  return <PieChart data={chartData} />;
}

StatTitleApproval.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  approvedStatuses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default memo(StatTitleApproval);
