import genreApi from "api/genreApi";

const updateGenre = async (id, genre) => {
  const response = await genreApi.update(id, genre);
  return response;
};

export default updateGenre;
