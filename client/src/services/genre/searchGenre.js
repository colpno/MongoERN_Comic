import genreApi from "api/genreApi";
import { useEffect, useState } from "react";

const searchGenre = (key, value) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await genreApi.search({ [key]: value });
        setGenres(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchGenres();
  }, []);

  return { genres, setGenres };
};

export default searchGenre;
