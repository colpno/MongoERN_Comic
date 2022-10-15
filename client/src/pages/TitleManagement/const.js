import { topSales } from "assets/images";

export const getContinuingCardData = (totalOfTitles, amount) => {
  return {
    rawData: {
      icon: topSales,
      label: "Continuing",
      amount,
      subLabel: "All time",
    },
    chartData: {
      data: {
        labels: ["Continuing titles", "All titles"],
        datasets: [
          {
            data: [amount, totalOfTitles],
            backgroundColor: ["hsl(151, 81%, 46%)", "transparent"],
          },
        ],
      },
    },
  };
};

export const getPausedCardData = (totalOfTitles, amount) => {
  return {
    rawData: {
      icon: topSales,
      label: "Paused",
      amount,
      subLabel: "All time",
    },
    chartData: {
      data: {
        labels: ["Paused titles", "All titles"],
        datasets: [
          {
            data: [amount, totalOfTitles],
            backgroundColor: ["rgb(240 240 0)", "transparent"],
          },
        ],
      },
    },
  };
};

export const getFinishedCardData = (totalOfTitles, amount) => {
  return {
    rawData: {
      icon: topSales,
      label: "Finished",
      amount,
      subLabel: "All time",
    },
    chartData: {
      data: {
        labels: ["Finished titles", "All titles"],
        datasets: [
          {
            data: [amount, totalOfTitles],
            backgroundColor: ["#f90000", "transparent"],
          },
        ],
      },
    },
  };
};
