import transactionApi from "api/transaction.api";

const transactionService = {
  getAll: async (params = {}) => {
    try {
      const response = await transactionApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (data, setProgress = () => {}) => {
    try {
      const response = await transactionApi.add(data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default transactionService;
