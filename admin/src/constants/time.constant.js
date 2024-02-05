const DAYS_OF_WEEK = [
  { shortLabel: "T2", label: "Thứ Hai", number: 0 },
  { shortLabel: "T3", label: "Thứ Ba", number: 1 },
  { shortLabel: "T4", label: "Thứ Tư", number: 2 },
  { shortLabel: "T5", label: "Thứ Năm", number: 3 },
  { shortLabel: "T6", label: "Thứ Sáu", number: 4 },
  { shortLabel: "T7", label: "Thứ Bảy", number: 5 },
  { shortLabel: "CN", label: "Chủ nhật", number: 6 },
];

const convertTimeLabel = (value, from, to) => {
  const found = DAYS_OF_WEEK.find((day) => day[from] === value)[to];
  return found;
};

export { DAYS_OF_WEEK, convertTimeLabel };
