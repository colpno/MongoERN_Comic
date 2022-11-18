import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const searchTitle = (key, value, limit) => {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({ limit, page: 1, total: 0 });
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.search(key, value, {
          limit: pagination.limit,
          page: pagination.page,
        });
        const converted = convertTitlesPropertyToString(response.data);
        setTitles(converted);
        setReFetch(false);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
        }));
      } catch (error) {
        throw new Error(error);
      }
    };

    reFetch && fetchTitles();
  }, [reFetch]);

  return { titles, setTitles, setReFetch };
};

export default searchTitle;
