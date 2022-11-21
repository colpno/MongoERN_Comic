import titleGenreApi from "api/titleGenreApi";
import { useEffect, useState } from "react";

const getAllTitleGenreByProperty = (prop) => {
  const [titleGenres, setTitleGenres] = useState([]);

  const fetchTitleGenre = async () => {
    try {
      const response = await titleGenreApi.getAllByProperty(prop);
      setTitleGenres(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTitleGenre();
  }, []);

  return { titleGenres, setTitleGenres };
};

export default getAllTitleGenreByProperty;
