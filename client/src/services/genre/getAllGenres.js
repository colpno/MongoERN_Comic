import genreApi from "api/genreApi";

const getAllGenres = async (params = {}) => {
  try {
    const response = await genreApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllGenres;
