import rentedTitleApi from "api/rentedTitleApi";
import { useEffect, useState } from "react";

const getLimitedRentedTitlesByUserID = (userID, limit) => {
  const [rentedTitles, setRentedTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });
  const fetchLimitRentedTitles = async () => {
    try {
      const response = await rentedTitleApi.getAll(userID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      setRentedTitles(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitRentedTitles();
  }, [pagination.page]);

  return { rentedTitles, setRentedTitles, pagination, setPagination };
};

export default getLimitedRentedTitlesByUserID;
