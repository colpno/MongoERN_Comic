import titleGenreApi from "api/titleGenreApi";

const getAllTitleGenres = async (params = {}) => {
  try {
    const response = await titleGenreApi.getAll(params);
    return response;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getAllTitleGenres;
