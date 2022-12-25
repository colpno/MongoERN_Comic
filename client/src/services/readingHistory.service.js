import readingHistoryApi from "api/readingHistory.api";

const readingHistoryService = {
  getAll: async (params = {}) => {
    try {
      const response = await readingHistoryApi.getAll(params);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  add: async (titleId, chapterId, userId) => {
    try {
      const response = await readingHistoryApi.add({
        titleId,
        chapterId,
        userId,
      });
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default readingHistoryService;
