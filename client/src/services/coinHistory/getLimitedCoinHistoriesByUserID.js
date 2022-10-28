import coinHistoryApi from "api/coinHistoryApi";
import { useEffect, useState } from "react";
import { convertCoinHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const getLimitedCoinHistoriesByUserID = (userID, limit) => {
  const [coinHistories, setCoinHistories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitCoinHistories = async () => {
    try {
      const response = await coinHistoryApi.getAllByUserID(userID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      const converted = convertCoinHistoriesPropertyToString(response.data);
      setCoinHistories(converted);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitCoinHistories();
  }, [pagination.page]);

  return { coinHistories, setCoinHistories, pagination, setPagination };
};

export default getLimitedCoinHistoriesByUserID;
