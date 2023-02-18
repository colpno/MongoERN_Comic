import genreApi from "api/genre.api";

const genreService = {
  getAll: async (params = {}) => {
    try {
      const response = await genreApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  getOne: async (genreID) => {
    try {
      const response = await genreApi.getOne(genreID);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (genre, setProgress = () => {}) => {
    try {
      const response = await genreApi.add(genre, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, genre, setProgress = () => {}) => {
    try {
      const response = await genreApi.update(id, genre, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (id, setProgress = () => {}) => {
    try {
      const response = await genreApi.delete(id, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default genreService;
