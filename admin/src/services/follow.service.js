import followApi from "api/follow.api";

const followService = {
  getAll: async (params = {}) => {
    try {
      const response = await followApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (titleId) => {
    try {
      const response = await followApi.add(titleId);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (titleId) => {
    try {
      const response = await followApi.delete(titleId);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default followService;
