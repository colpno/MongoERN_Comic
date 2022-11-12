import titleGenreApi from "api/titleGenreApi";
import { useEffect, useState } from "react";

const searchTitleGenre = (key, value) => {
  const [titleGenres, setTitleGenres] = useState([]);

  useEffect(() => {
    const fetchTitleGenres = async () => {
      try {
        const response = await titleGenreApi.search({ [key]: value });
        setTitleGenres(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitleGenres();
  }, []);

  return { titleGenres, setTitleGenres };
};

export default searchTitleGenre;
