import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const filterTitles = (property, params, limit) => {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetch = async (prop, pr) => {
    try {
      const response = await titleApi.filter(prop, {
        ...pr,
        limit: pagination.limit,
        page: pagination.page,
      });
      const converted = convertTitlesPropertyToString(response.data);
      setTitles(converted);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetch(property, params);
  }, [pagination.page]);

  return { titles, setTitles, pagination, setPagination, fetch };
};

export default filterTitles;
