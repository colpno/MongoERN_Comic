import { Col } from "react-bootstrap";
import PropTypes from "prop-types";

import StatisticCard from "components/StatisticCard/StatisticCard";
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

function MemberManagementCards({ totalCoin, totalIncome, highestCoin, highestIncome }) {
  const chartColors = getChartColors().backgroundColors;

  const continuingCardData = cardData(
    {
      icon: topSales,
      label: "Số coin cao nhất",
      subLabel: "Toàn thời gian",
      amount: highestCoin,
    },
    {
      labels: ["Số coin", "Tổng coin"],
      datasets: [
        {
          data: [highestCoin, totalCoin - highestCoin],
          backgroundColor: [chartColors[11], "lightblue"],
        },
      ],
    }
  );
  const pausedCardData = cardData(
    {
      icon: topSales,
      label: "Thu nhập cao nhất",
      subLabel: "Toàn thời gian",
      amount: highestIncome,
    },
    {
      labels: ["Thu nhập", "Tổng thu nhập"],
      datasets: [
        {
          data: [highestIncome, totalIncome - highestIncome],
          backgroundColor: [chartColors[8], "lightblue"],
        },
      ],
    }
  );

  return (
    <>
      <Col md={6}>
        <StatisticCard
          rawData={continuingCardData.rawData}
          chartProps={continuingCardData.chartProps}
        />
      </Col>
      <Col md={6}>
        <StatisticCard rawData={pausedCardData.rawData} chartProps={pausedCardData.chartProps} />
      </Col>
    </>
  );
}

MemberManagementCards.propTypes = {
  totalCoin: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  highestCoin: PropTypes.number.isRequired,
  highestIncome: PropTypes.number.isRequired,
};

export default MemberManagementCards;
