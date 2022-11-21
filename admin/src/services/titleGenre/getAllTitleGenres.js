import titleGenreApi from "api/titleGenreApi";
import { useEffect, useState } from "react";

const getAllTitleGenres = () => {
  const [titleGenres, setTitleGenres] = useState([]);

  const fetchAllTitleGenres = async () => {
    try {
      const response = await titleGenreApi.getAll();
      setTitleGenres(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchAllTitleGenres();
  }, []);

  return { titleGenres, setTitleGenres };
};

export default getAllTitleGenres;
