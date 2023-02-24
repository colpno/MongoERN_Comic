import chapterTransactionApi from "api/chapterTransaction.api";

const chapterTransactionService = {
  getAll: async (params = {}) => {
    try {
      const response = await chapterTransactionApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (titleId, chapterId, method, cost, expiredAt, setProgress = () => {}) => {
    try {
      const response = await chapterTransactionApi.add(
        titleId,
        chapterId,
        method,
        cost,
        expiredAt,
        setProgress
      );
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default chapterTransactionService;
