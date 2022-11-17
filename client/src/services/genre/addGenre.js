import genreApi from "api/genreApi";

const addGenre = async (genre, setProgress) => {
  const response = await genreApi.add(genre, setProgress);
  return response;
};

export default addGenre;
