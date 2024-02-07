import PropTypes from "prop-types";
import { memo, useMemo } from "react";

import { BarChart } from "features";
import { getChartColors } from "utils/constants";

function ChapterPayStat({ chapters }) {
  const { backgroundColors } = getChartColors();
  const labels = ["Trả phí", "Miễn phí"];
  const chartData = useMemo(() => {
    return chapters.reduce(
      (result, chapter) => {
        const index = chapter.cost ? 0 : 1;
        result.datasets[0].data[index]++;
        return result;
      },
      {
        labels,
        datasets: [
          {
            label: "Số lượng",
            data: [0, 0],
            backgroundColor: [backgroundColors[7], backgroundColors[9]],
          },
        ],
      }
    );
  }, [chapters]);

  return <BarChart data={chartData} title="Số lượng chương trả phí" direction="horizontal" />;
}

ChapterPayStat.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default memo(ChapterPayStat);
