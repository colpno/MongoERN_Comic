import { LineChart } from "features";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import SelectorContainer from "./SelectorContainer";

function ChapterStatistic({
  cx,
  chapterSelectOptions,
  changeChapter,
  chartData,
  chartLabels,
  backgroundColors,
  borderColors,
  selectedChapter,
}) {
  return (
    <>
      <SelectorContainer
        cx={cx}
        titleLabel="Chương"
        value={selectedChapter}
        options={chapterSelectOptions}
        handleChange={changeChapter}
      />
      <Row>
        <LineChart
          beginAtZero
          labels={chartLabels}
          datasets={[
            {
              label: "Lượt xem",
              data: chartData.views,
              backgroundColor: backgroundColors[6],
              borderColor: borderColors[6],
            },
          ]}
        />
      </Row>
      <Row>
        <LineChart
          beginAtZero
          labels={chartLabels}
          datasets={[
            {
              label: "Lượt thích",
              data: chartData.likes,
              backgroundColor: backgroundColors[7],
              borderColor: borderColors[7],
            },
          ]}
        />
      </Row>
    </>
  );
}

ChapterStatistic.propTypes = {
  cx: PropTypes.func.isRequired,
  chapterSelectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  chartData: PropTypes.shape({
    views: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    likes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  changeChapter: PropTypes.func.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  backgroundColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  borderColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectedChapter: PropTypes.shape({}).isRequired,
};

export default ChapterStatistic;
