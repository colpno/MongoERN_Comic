import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const searchTitle = (key, value, limit) => {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({ limit, page: 1, total: 0 });

  const fetchTitles = async (k, v) => {
    try {
      const response = await titleApi.search(k, v, {
        limit: pagination.limit,
        page: pagination.page,
      });
      const converted = convertTitlesPropertyToString(response.data);
      setTitles(converted);
      setPagination((prev) => ({
        ...prev,
        total: response.pagination.total,
      }));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTitles(key, value);
  }, []);

  return {
    titles,
    setTitles,
    pagination,
    setPagination,
    setReFetch: fetchTitles,
  };
};

export default searchTitle;
