const convert = (history = {}) => {
  const { amount } = history;

  return {
    ...history,
    amount: Number.parseInt(amount, 10),
  };
};

export const convertPointHistoryData = (histories = []) => {
  const result = histories.map((history) => convert(history));
  return result;
};
