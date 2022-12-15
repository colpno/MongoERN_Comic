const convert = (history = {}) => {
  const { amount } = history;

  return {
    ...history,
    amount: Number.parseInt(amount, 10),
  };
};

export const convertCoinHistoryData = (histories = []) => {
  const result = histories.map((history) => convert(history));
  return result;
};
