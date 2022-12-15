import incomeReportApi from "api/incomeReportApi";

const getAllIncomeReports = async (params = {}) => {
  try {
    const response = await incomeReportApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllIncomeReports;
