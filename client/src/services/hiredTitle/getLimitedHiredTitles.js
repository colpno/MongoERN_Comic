import hiredTitleApi from "api/hiredTitleApi";
import { useEffect, useState } from "react";

const getAllHiredTitles = (limit) => {
  const [hiredTitles, setHiredTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitHiredTitles = async () => {
    try {
      const response = await hiredTitleApi.getAll({
        _page: pagination.page,
        _limit: pagination.limit,
      });
      setHiredTitles(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitHiredTitles();
  }, [pagination.page]);

  return { hiredTitles, setHiredTitles, pagination, setPagination };
};

export default getAllHiredTitles;
