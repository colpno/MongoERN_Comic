import genreApi from "api/genreApi";

const deleteGenre = async (id, setProgress) => {
  const response = await genreApi.delete(id, setProgress);
  return response;
};

export default deleteGenre;
