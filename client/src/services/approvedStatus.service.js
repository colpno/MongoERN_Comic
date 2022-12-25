import approvedStatusApi from "api/approvedStatusApi";

const approvedStatusService = {
  getAll: async (params = {}) => {
    try {
      const response = await approvedStatusApi.getAll(params);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  getOne: async (approvedStatusID) => {
    try {
      const response = await approvedStatusApi.getOne(approvedStatusID);
      return response[0];
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default approvedStatusService;
