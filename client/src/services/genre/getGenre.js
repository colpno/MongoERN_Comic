import genreApi from "api/genreApi";

const getGenre = async (genreID) => {
  try {
    const response = await genreApi.getOne(genreID);
    return response[0];
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getGenre;
