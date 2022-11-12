import genreApi from "api/genreApi";

const addGenre = async (genre) => {
  const response = await genreApi.add(genre);
  return response;
};

export default addGenre;
