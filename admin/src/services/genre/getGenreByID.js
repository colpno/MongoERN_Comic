import genreApi from "api/genreApi";
import { useEffect, useState } from "react";

const getGenreByID = (genreID) => {
  const [genre, setGenre] = useState({});

  const fetchGenre = async () => {
    try {
      const response = await genreApi.getOneByID(genreID);
      setGenre(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchGenre();
  }, [genreID]);

  return { genre, setGenre };
};

export default getGenreByID;
