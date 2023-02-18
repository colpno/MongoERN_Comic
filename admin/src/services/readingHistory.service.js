import readingHistoryApi from "api/readingHistory.api";

const readingHistoryService = {
  getAll: async (params = {}) => {
    try {
      const response = await readingHistoryApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (titleId, chapterId) => {
    try {
      const response = await readingHistoryApi.add(titleId, chapterId);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default readingHistoryService;
