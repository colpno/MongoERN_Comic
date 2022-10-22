import purchasedTitleApi from "api/purchasedTitleApi";
import { useEffect, useState } from "react";

const getLimitedPurchasedTitlesByUserID = (userID, limit) => {
  const [purchasedTitles, setPurchasedTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });
  const fetchLimitPurchasedTitles = async () => {
    try {
      const response = await purchasedTitleApi.getAll(userID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      setPurchasedTitles(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitPurchasedTitles();
  }, [pagination.page]);

  return { purchasedTitles, setPurchasedTitles, pagination, setPagination };
};

export default getLimitedPurchasedTitlesByUserID;
