import chapterReportApi from "api/chapterReportApi";

const getAllChapterReports = async (params = {}) => {
  try {
    const response = await chapterReportApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllChapterReports;
