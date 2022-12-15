const convert = (report = {}) => {
  const { like, view } = report;

  return {
    ...report,
    like: Number.parseInt(like, 10),
    view: Number.parseInt(view, 10),
  };
};

export const convertTitleReportData = (reports = []) => {
  const result = reports.map((report) => convert(report));
  return result;
};
