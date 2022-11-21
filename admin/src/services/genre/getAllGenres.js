import genreApi from "api/genreApi";
import { useEffect, useState } from "react";

const getAllGenres = () => {
  const [genres, setGenres] = useState([]);

  const fetchAllGenres = async () => {
    try {
      const response = await genreApi.getAll();
      setGenres(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchAllGenres();
  }, []);

  return { genres, setGenres };
};

export default getAllGenres;
