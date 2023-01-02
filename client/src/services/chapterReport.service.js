import chapterReportApi from "api/chapterReport.api";

const chapterReportService = {
  getAll: async (params = {}) => {
    try {
      const response = await chapterReportApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default chapterReportService;
