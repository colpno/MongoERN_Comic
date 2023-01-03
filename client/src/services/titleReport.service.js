import titleReportApi from "api/titleReport.api";

const titleReportService = {
  getAll: async (params = {}) => {
    try {
      const response = await titleReportApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default titleReportService;
