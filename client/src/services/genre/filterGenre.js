import genreApi from "api/genreApi";
import { useEffect, useState } from "react";

const filterGenre = (property, limit) => {
  const [genres, setGenres] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit, total: 0 });

  const fetch = async (prop) => {
    try {
      const response = await genreApi.filter(prop, {
        limit: pagination.limit,
        page: pagination.page,
      });
      setGenres(response.data);
      setPagination((prev) => ({ ...prev, total: response.pagination.total }));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    property && fetch(property);
  }, []);

  return { genres, setGenres, fetch };
};

export default filterGenre;
