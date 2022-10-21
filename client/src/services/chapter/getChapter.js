import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";

const getChapters = (titleID, limit) => {
  const [chapters, setChapters] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchAllChapters = async () => {
    try {
      const response = await chapterApi.getAll(titleID);
      setChapters(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchLimitChapters = async () => {
    try {
      const response = await chapterApi.getAll(titleID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      setChapters(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    limit ? fetchLimitChapters() : fetchAllChapters();
  }, [pagination.page]);

  return { chapters, setChapters, pagination, setPagination };
};

export default getChapters;
