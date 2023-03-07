import titleApi from "api/title.api";

const titleService = {
  getAll: async (params = {}, isPrivate = true) => {
    try {
      const response = await titleApi.getAll(params, isPrivate);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  getOne: async (params, isPrivate = true) => {
    try {
      const { _id: id } = params;
      const response = await titleApi.getOne(id, params, isPrivate);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  random: async (params = {}) => {
    try {
      const response = await titleApi.random(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (title, cover, author, summary, genres, coin, releaseDay, setProgress = () => {}) => {
    try {
      const response = await titleApi.add(
        title,
        cover,
        author,
        summary,
        genres,
        coin,
        releaseDay,
        setProgress
      );
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, data = {}, setProgress = () => {}) => {
    try {
      const response = await titleApi.update(id, data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (id, params = {}, setProgress = () => {}) => {
    try {
      const response = await titleApi.delete(id, params, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default titleService;
