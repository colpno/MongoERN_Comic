import genreApi from "api/genreApi";

const deleteGenre = async (id) => {
  const response = await genreApi.delete(id);
  return response;
};

export default deleteGenre;
