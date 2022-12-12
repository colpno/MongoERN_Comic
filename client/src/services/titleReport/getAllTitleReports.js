import titleReportApi from "api/titleReportApi";

const getAllTitleReports = async (params = {}) => {
  try {
    const response = await titleReportApi.getAll(params);
    return response;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getAllTitleReports;
