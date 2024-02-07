import PropTypes from "prop-types";
import { useMemo } from "react";

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
  const { backgroundColors } = getChartColors();
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
            data: Array(approvedStatuses.length).fill(0),
            backgroundColor: [backgroundColors[1], backgroundColors[0], backgroundColors[4]],
          },
        ],
      }
    );
  }, [titles, approvedStatuses]);

  return <PieChart data={chartData} title="Trạng thái duyệt" legend={{ position: "right" }} />;
}

StatTitleApproval.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  approvedStatuses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default StatTitleApproval;
