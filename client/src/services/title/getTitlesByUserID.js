import titleApi from "api/titleApi";
import { useEffect, useState } from "react";

const getTitlesByUserID = (ID, limit) => {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchAllTitles = async () => {
    try {
      const response = await titleApi.getAll();
      setTitles(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchLimitTitles = async () => {
    try {
      const response = await titleApi.getAllByUserID(ID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      setTitles(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    limit ? fetchLimitTitles() : fetchAllTitles();
  }, [pagination.page]);

  return limit
    ? { titles, setTitles, pagination, setPagination }
    : { titles, setTitles };
};

export default getTitlesByUserID;
