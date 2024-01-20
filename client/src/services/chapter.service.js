import chapterApi from "api/chapter.api";

const chapterService = {
  getAll: async (params = {}, isPrivate = true) => {
    try {
      const response = await chapterApi.getAll(params, isPrivate);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  getOne: async (chapterID, params, isPrivate = true) => {
    try {
      const response = await chapterApi.getOne(chapterID, params, isPrivate);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (data, setProgress = () => {}) => {
    try {
      const response = await chapterApi.add(data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, data, setProgress = () => {}) => {
    try {
      const response = await chapterApi.update(id, data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (id, setProgress = () => {}) => {
    try {
      const response = await chapterApi.delete(id, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default chapterService;
