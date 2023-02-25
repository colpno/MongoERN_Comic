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

function ChapterManagementCards({ totalChapters, waiting, accepted, rejected }) {
  const chartColors = getChartColors().backgroundColors;
  const waitingCardData = cardData(
    {
      icon: topSales,
      label: "Chờ duyệt",
      subLabel: "Toàn thời gian",
      amount: waiting,
    },
    {
      labels: ["Chờ duyệt", "Tất cả"],
      datasets: [
        {
          data: [waiting, totalChapters - waiting],
          backgroundColor: [chartColors[15], "lightblue"],
        },
      ],
    }
  );
  const acceptedCardData = cardData(
    {
      icon: topSales,
      label: "Đã duyệt",
      subLabel: "Toàn thời gian",
      amount: accepted,
    },
    {
      labels: ["Đã duyệt", "Tất cả"],
      datasets: [
        {
          data: [accepted, totalChapters - accepted],
          backgroundColor: [chartColors[12], "lightblue"],
        },
      ],
    }
  );
  const rejectedCardData = cardData(
    {
      icon: topSales,
      label: "Từ chối",
      subLabel: "Toàn thời gian",
      amount: rejected,
    },
    {
      labels: ["Từ chối", "Tất cả"],
      datasets: [
        {
          data: [rejected, totalChapters - rejected],
          backgroundColor: [chartColors[0], "lightblue"],
        },
      ],
    }
  );

  return (
    <>
      <Col xs={12} md={12} lg={6} xl={4}>
        <AdminCard rawData={waitingCardData.rawData} chartProps={waitingCardData.chartProps} />
      </Col>
      <Col xs={12} md={12} lg={6} xl={4}>
        <AdminCard rawData={acceptedCardData.rawData} chartProps={acceptedCardData.chartProps} />
      </Col>
      <Col xs={12} md={12} lg={{ span: 8, offset: 2 }} xl={{ span: 4, offset: 0 }}>
        <AdminCard rawData={rejectedCardData.rawData} chartProps={rejectedCardData.chartProps} />
      </Col>
    </>
  );
}

ChapterManagementCards.propTypes = {
  totalChapters: PropTypes.number.isRequired,
  waiting: PropTypes.number.isRequired,
  accepted: PropTypes.number.isRequired,
  rejected: PropTypes.number.isRequired,
};

export default ChapterManagementCards;
