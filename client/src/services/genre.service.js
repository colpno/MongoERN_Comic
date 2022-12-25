import genreApi from "api/genre.api";

const genreService = {
  getAll: async (params = {}) => {
    try {
      const response = await genreApi.getAll(params);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  getOne: async (genreID) => {
    try {
      const response = await genreApi.getOne(genreID);
      return response[0];
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  add: async (genre, setProgress) => {
    try {
      const response = await genreApi.add(genre, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  update: async (id, genre, setProgress) => {
    try {
      const response = await genreApi.update(id, genre, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  delete: async (id, setProgress) => {
    try {
      const response = await genreApi.delete(id, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default genreService;
