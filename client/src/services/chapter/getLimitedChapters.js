import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChaptersPropertyToString } from "utils/convertArrayPropertyToString";

const getLimitedChapters = (limit) => {
  const [chapters, setChapters] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitChapters = async () => {
    try {
      const response = await chapterApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
      });
      const converted = convertChaptersPropertyToString(response.data);
      setChapters(converted);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitChapters();
  }, [pagination.page]);

  return { chapters, setChapters, pagination, setPagination };
};

export default getLimitedChapters;
