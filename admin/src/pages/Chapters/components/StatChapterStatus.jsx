import PropTypes from "prop-types";
import { memo, useMemo } from "react";

import { PieChart } from "features";
import { getChartColors } from "utils/constants";
import { useGetObjectStatuses } from "hooks/index.jsx";

function StatChapterStatus({ chapters }) {
  const { data: statuses } = useGetObjectStatuses({
    _fields: "code status",
  });
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
  const { backgroundColors } = getChartColors();
  const chartData = useMemo(() => {
    return chapters.reduce(
      (result, title) => {
        const index = status.code.indexOf(title.status_id.code);
        result.datasets[0].data[index]++;
        return result;
      },
      {
        labels: status.status,
        datasets: [
          {
            label: "",
            data: initData,
            backgroundColor: [backgroundColors[4], "grey"],
          },
        ],
      }
    );
  }, [chapters]);

  return <PieChart data={chartData} title="Trạng thái xuất bản" legend={{ position: "right" }} />;
}

StatChapterStatus.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default memo(StatChapterStatus);
