import { topSales } from "assets/images";

export const getContinuingCardData = (totalOfTitles, amount) => {
  return {
    rawData: {
      icon: topSales,
      label: "Waiting",
      amount,
      subLabel: "All time",
    },
    chartProps: {
      data: {
        labels: ["Waiting chapters", "All chapters"],
        datasets: [
          {
            data: [amount, totalOfTitles],
            backgroundColor: ["hsl(151, 81%, 46%)", "transparent"],
          },
        ],
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

export const getPausedCardData = (totalOfTitles, amount) => {
  return {
    rawData: {
      icon: topSales,
      label: "Paused",
      amount,
      subLabel: "All time",
    },
    chartProps: {
      data: {
        labels: ["Paused titles", "All titles"],
        datasets: [
          {
            data: [amount, totalOfTitles],
            backgroundColor: ["rgb(240 240 0)", "transparent"],
          },
        ],
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

export const getFinishedCardData = (totalOfTitles, amount) => {
  return {
    rawData: {
      icon: topSales,
      label: "Finished",
      amount,
      subLabel: "All time",
    },
    chartProps: {
      data: {
        labels: ["Finished titles", "All titles"],
        datasets: [
          {
            data: [amount, totalOfTitles],
            backgroundColor: ["#f90000", "transparent"],
          },
        ],
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
