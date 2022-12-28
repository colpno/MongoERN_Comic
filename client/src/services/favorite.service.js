import favoriteApi from "api/favorite.api";

const favoriteService = {
  getAll: async (params = {}) => {
    try {
      const response = await favoriteApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (userId, chapterId) => {
    try {
      const response = await favoriteApi.add(userId, chapterId);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (userId, chapterId) => {
    try {
      const response = await favoriteApi.delete(userId, chapterId);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default favoriteService;
