import favoriteApi from "api/favoriteApi";

const favoriteService = {
  getAll: async (params = {}) => {
    try {
      const response = await favoriteApi.getAll(params);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  add: async (userId, chapterId) => {
    try {
      const response = await favoriteApi.add(userId, chapterId);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  delete: async (userId, chapterId) => {
    try {
      const response = await favoriteApi.delete(userId, chapterId);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default favoriteService;
