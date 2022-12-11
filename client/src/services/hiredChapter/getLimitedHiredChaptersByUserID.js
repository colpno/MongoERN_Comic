import hiredChapterApi from "api/hiredChapterApi";
import { useEffect, useState } from "react";

const getHiredChapters = (properties) => {
  const [hiredChapters, setHiredChapters] = useState([]);
  const [pagination, setPagination] = useState(
    properties.limit
      ? {
          page: 1,
          limit: properties.limit,
          total: 0,
        }
      : {}
  );

  const fetchLimitHiredChapters = async () => {
    try {
      const props = { ...properties, ...pagination };
      const response = await hiredChapterApi.getAll(props);

      if (properties.limit) {
        setHiredChapters(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
        }));
      } else {
        setHiredChapters(response);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitHiredChapters();
  }, [pagination.page]);

  return { hiredChapters, setHiredChapters, pagination, setPagination };
};

export default getHiredChapters;
