import followApi from "api/followApi";
import { useEffect, useState } from "react";

const getLimitedFollowsByUserID = (userID, limit) => {
  const [follows, setFollows] = useState([]);
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitFollows = async () => {
    try {
      const response = await followApi.getAllByUserID(userID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      setFollows(response.data);
      setTitles(response.data.map((follow) => follow.title));
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

  return { titles, setTitles, follows, setFollows, pagination, setPagination };
};

export default getLimitedFollowsByUserID;
