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
  getOne: async (approvedStatusID) => {
    try {
      const response = await approvedStatusApi.getOne(approvedStatusID);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default approvedStatusService;
