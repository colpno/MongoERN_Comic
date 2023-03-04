import approvedStatusApi from "api/approvedStatus.api";

const approvedStatusService = {
  getAll: async (params = {}) => {
    try {
      const response = await approvedStatusApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  getOne: async (approvedStatusID, params) => {
    try {
      const response = await approvedStatusApi.getOne(approvedStatusID, params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default approvedStatusService;
