import ticketHistoryApi from "api/ticketHistoryApi";
import { useEffect, useState } from "react";
import { convertTicketHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const getLimitedTicketHistoriesByUserID = (userID, limit) => {
  const [ticketHistories, setTicketHistories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitTicketHistories = async () => {
    try {
      const response = await ticketHistoryApi.getAll(userID, {
        _page: pagination.page,
        _limit: pagination.limit,
      });
      const converted = convertTicketHistoriesPropertyToString(response);
      setTicketHistories(converted);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitTicketHistories();
  }, [pagination.page]);

  return { ticketHistories, setTicketHistories, pagination, setPagination };
};

export default getLimitedTicketHistoriesByUserID;
