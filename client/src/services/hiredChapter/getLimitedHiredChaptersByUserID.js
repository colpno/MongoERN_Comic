import hiredTitleApi from "api/hiredTitleApi";
import { useEffect, useState } from "react";

const getAllHiredChaptersByUserID = (userID, limit) => {
  const [hiredChapters, setHiredChapters] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitHiredChapters = async () => {
    try {
      const response = await hiredTitleApi.getAll(userID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      setHiredChapters(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitHiredChapters();
  }, [pagination.page]);

  return { hiredChapters, setHiredChapters, pagination, setPagination };
};

export default getAllHiredChaptersByUserID;
