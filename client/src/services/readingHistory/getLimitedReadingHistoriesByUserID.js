import readingHistoryApi from "api/readingHistoryApi";
import { useEffect, useState } from "react";

const getLimitedReadingHistoriesByUserID = (userID, limit) => {
  const [readingHistories, setReadingHistories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitReadingHistories = async () => {
    try {
      const response = await readingHistoryApi.getAll(userID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      setReadingHistories(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitReadingHistories();
  }, [pagination.page]);

  return { readingHistories, setReadingHistories, pagination, setPagination };
};

export default getLimitedReadingHistoriesByUserID;
