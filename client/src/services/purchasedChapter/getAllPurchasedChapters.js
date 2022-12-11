import purchasedChapterApi from "api/purchasedChapterApi";
import { useEffect, useState } from "react";

const getAllPurchasedChapters = (properties = {}) => {
  const [purchasedChapters, setPurchasedChapters] = useState([]);
  const [pagination, setPagination] = useState(
    properties.limit
      ? {
          page: 1,
          limit: properties.limit,
        }
      : {}
  );

  const fetchLimitPurchasedChapters = async () => {
    try {
      const props = { ...properties, ...pagination };
      const response = await purchasedChapterApi.getAll(props);

      if (properties.limit) {
        setPurchasedChapters(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
        }));
      } else {
        setPurchasedChapters(response);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitPurchasedChapters();
  }, []);

  return { purchasedChapters, setPurchasedChapters, pagination, setPagination };
};

export default getAllPurchasedChapters;
