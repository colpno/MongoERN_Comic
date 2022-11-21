import genreApi from "api/genreApi";

const updateGenre = async (id, genre, setProgress) => {
  const response = await genreApi.update(id, genre, setProgress);
  return response;
};

export default updateGenre;
