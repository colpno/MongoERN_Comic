const convert = (report = {}) => {
  const { income, month, year } = report;

  return {
    ...report,
    income: Number.parseInt(income, 10),
    month: Number.parseInt(month, 10),
    year: Number.parseInt(year, 10),
  };
};

export const convertIncomeData = (reports = []) => {
  const result = reports.map((report) => convert(report));
  return result;
};
