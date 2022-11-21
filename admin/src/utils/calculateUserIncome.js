export const calculateUserIncome = (likes = 0) => {
  // income = 1 like * 100 vnd
  const UNIT = "VNĐ";
  const BASE = 100;
  const income = `${BASE * likes} ${UNIT}`;
  return income;
};
