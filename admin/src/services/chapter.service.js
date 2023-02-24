import chapterApi from "api/chapter.api";

const chapterService = {
  getAll: async (params = {}) => {
    try {
      const response = await chapterApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  getOne: async (chapterID) => {
    try {
      const response = await chapterApi.getOne(chapterID);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (titleId, title, cover, contents, order, cost, setProgress = () => {}) => {
    try {
      const response = await chapterApi.add(
        titleId,
        title,
        cover,
        contents,
        order,
        cost,
        setProgress
      );
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
