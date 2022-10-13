import genreApi from "api/genreApi";
import { useEffect, useState } from "react";

function genreServices() {
  const [genres, setGenres] = useState();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await genreApi.getAll();
        const options = response.map((genr) => {
          return { value: `${genr.id}`, label: genr.genre };
        });
        setGenres(options);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchGenres();
  }, []);

  return { genres, setGenres };
}

export default genreServices;
