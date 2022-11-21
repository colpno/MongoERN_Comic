import { Col } from "react-bootstrap";
import PropTypes from "prop-types";

import AdminCard from "layouts/AdminLayout/components/AdminCard";
import { topSales } from "assets/images";
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

function TitleManagementCards({ totalTitles, continuing, paused, finished }) {
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
        <AdminCard
          rawData={continuingCardData.rawData}
          chartProps={continuingCardData.chartProps}
        />
      </Col>
      <Col md={4}>
        <AdminCard
          rawData={pausedCardData.rawData}
          chartProps={pausedCardData.chartProps}
        />
      </Col>
      <Col md={4}>
        <AdminCard
          rawData={finishedCardData.rawData}
          chartProps={finishedCardData.chartProps}
        />
      </Col>
    </>
  );
}

TitleManagementCards.propTypes = {
  totalTitles: PropTypes.number.isRequired,
  continuing: PropTypes.number.isRequired,
  paused: PropTypes.number.isRequired,
  finished: PropTypes.number.isRequired,
};

export default TitleManagementCards;
