import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChaptersPropertyToString } from "utils/convertArrayPropertyToString";

const filterChapters = (property, limit) => {
  const [chapters, setChapters] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetch = async (prop) => {
    try {
      const response = await chapterApi.filter(prop, {
        page: pagination.page,
        limit: pagination.limit,
      });
      const converted = convertChaptersPropertyToString(response.data);
      setChapters(converted);
      setPagination((prev) => ({
        ...prev,
        total: response.pagination.total,
      }));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    property && fetch(property);
  }, [pagination.page]);

  return { chapters, setChapters, pagination, setPagination, fetch };
};

export default filterChapters;
