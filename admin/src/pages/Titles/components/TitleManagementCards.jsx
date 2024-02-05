import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { Col } from "react-bootstrap";

import { topSales } from "assets/images";
import StatisticCard from "components/StatisticCard/StatisticCard";
import { getChartColors } from "utils/constants";

const cardData = (textData, chartData) => {
  const { icon, label, amount, subLabel } = textData;
  const { labels, datasets } = chartData;

  return {
    rawData: {
      icon,
      label,
      amount,
      subLabel,
    },
    chartProps: {
      data: {
        labels,
        datasets,
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    },
  };
};

function TitleManagementCards({ titles }) {
  const titleStatuses = useMemo(() => {
    return titles.reduce(
      (result, title) => {
        switch (title.releaseDay) {
          case "paused":
            return { ...result, paused: result.paused + 1 };
          case "finished":
            return { ...result, finished: result.finished + 1 };
          default:
            return { ...result, continuing: result.continuing + 1 };
        }
      },
      { continuing: 0, paused: 0, finished: 0, total: titles.length }
    );
  }, [titles]);
  const { continuing, paused, finished, total: totalTitles } = titleStatuses;

  const chartColors = getChartColors().backgroundColors;
  const continuingCardData = cardData(
    {
      icon: topSales,
      label: "Tiếp tục đăng",
      subLabel: "Toàn thời gian",
      amount: continuing,
    },
    {
      labels: ["Tiếp tục", "Tất cả"],
      datasets: [
        {
          data: [continuing, totalTitles - continuing],
          backgroundColor: [chartColors[5], "lightblue"],
        },
      ],
    }
  );
  const pausedCardData = cardData(
    {
      icon: topSales,
      label: "Tạm dừng",
      subLabel: "Toàn thời gian",
      amount: paused,
    },
    {
      labels: ["Tạm dừng", "Tất cả"],
      datasets: [
        {
          data: [paused, totalTitles - paused],
          backgroundColor: [chartColors[7], "lightblue"],
        },
      ],
    }
  );
  const finishedCardData = cardData(
    {
      icon: topSales,
      label: "Hoàn thành",
      subLabel: "Toàn thời gian",
      amount: finished,
    },
    {
      labels: ["Hoàn thành", "Tất cả"],
      datasets: [
        {
          data: [finished, totalTitles - finished],
          backgroundColor: ["#000", "lightblue"],
        },
      ],
    }
  );

  return (
    <>
      <Col md={4}>
        <StatisticCard
          rawData={continuingCardData.rawData}
          chartProps={continuingCardData.chartProps}
        />
      </Col>
      <Col md={4}>
        <StatisticCard rawData={pausedCardData.rawData} chartProps={pausedCardData.chartProps} />
      </Col>
      <Col md={4}>
        <StatisticCard
          rawData={finishedCardData.rawData}
          chartProps={finishedCardData.chartProps}
        />
      </Col>
    </>
  );
}

TitleManagementCards.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default memo(TitleManagementCards);
