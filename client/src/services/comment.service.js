import commentApi from "api/comment.api";

const commentService = {
  getAll: async (params = {}) => {
    try {
      const response = await commentApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (data = {}, setProgress = () => {}) => {
    try {
      const response = await commentApi.add(data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, data = {}, setProgress = () => {}) => {
    try {
      const response = await commentApi.update(id, data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default commentService;
