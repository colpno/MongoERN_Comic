import coinHistoryApi from "api/coinHistory.api";

const coinHistoryService = {
  getAll: async (params = {}) => {
    try {
      const response = await coinHistoryApi.getAll(params);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default coinHistoryService;
