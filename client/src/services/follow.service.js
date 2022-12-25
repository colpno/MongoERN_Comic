import followApi from "api/followApi";

const followService = {
  getAll: async (params = {}) => {
    try {
      const response = await followApi.getAll(params);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  add: async (titleId) => {
    try {
      const response = await followApi.add(titleId);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  delete: async (followId) => {
    try {
      const response = await followApi.delete(followId);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default followService;
