import followApi from "api/followApi";
import { useEffect, useState } from "react";

const getLimitedFollowsByUserID = (userID, limit) => {
  const [follows, setFollows] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitFollows = async () => {
    try {
      const response = await followApi.getAllByUserID(userID, {
        page: pagination.page,
        limit: pagination.limit,
      });
      setFollows(response.data);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitFollows();
  }, [pagination.page]);

  return {
    follows,
    setFollows,
    pagination,
    setPagination,
    fetchLimitFollows,
  };
};

export default getLimitedFollowsByUserID;
