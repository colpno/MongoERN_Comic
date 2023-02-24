import incomeApi from "api/income.api";

const incomeService = {
  getAll: async (params = {}) => {
    try {
      const response = await incomeApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default incomeService;
