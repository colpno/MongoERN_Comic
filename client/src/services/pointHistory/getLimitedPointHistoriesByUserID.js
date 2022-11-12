import pointHistoryApi from "api/pointHistoryApi";
import { useEffect, useState } from "react";
import { convertPointHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const getLimitedPointHistoriesByUserID = (userID, limit) => {
  const [pointHistories, setPointHistories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitPointHistories = async () => {
    try {
      const response = await pointHistoryApi.getAll(userID, {
        page: pagination.page,
        limit: pagination.limit,
      });
      const converted = convertPointHistoriesPropertyToString(response);
      setPointHistories(converted);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitPointHistories();
  }, [pagination.page]);

  return { pointHistories, setPointHistories, pagination, setPagination };
};

export default getLimitedPointHistoriesByUserID;
