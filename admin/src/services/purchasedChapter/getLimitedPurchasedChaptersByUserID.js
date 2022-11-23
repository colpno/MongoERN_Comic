import purchasedChapterApi from "api/purchasedChapterApi";
import { useEffect, useState } from "react";

const getLimitedPurchasedChaptersByUserID = (userID, limit) => {
  const [purchasedChapters, setPurchasedChapters] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitPurchasedChapters = async () => {
    try {
      const response = await purchasedChapterApi.getAllByUserID(userID, {
        page: pagination.page,
        limit: pagination.limit,
      });
      setPurchasedChapters(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitPurchasedChapters();
  }, [pagination.page]);

  return { purchasedChapters, setPurchasedChapters, pagination, setPagination };
};

export default getLimitedPurchasedChaptersByUserID;