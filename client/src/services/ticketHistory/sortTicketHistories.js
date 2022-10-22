import ticketHistoryApi from "api/ticketHistoryApi";
import { useEffect, useState } from "react";
import { convertTicketHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const sortTicketHistories = (titleID, col, isAsc = true, limit = 50) => {
  const [ticketHistories, setTicketHistories] = useState([]);
  const [sort, setSort] = useState({ isAsc, col });
  const [ID, setID] = useState(titleID);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const setTitleID = (id) => {
    setID(id);
  };

  const sorting = (column) => {
    setSort({ isAsc: !sort.isAsc, col: column });
  };

  const sortOrder = () => (sort.isAsc ? "asc" : "desc");

  const normalSort = async () => {
    try {
      const response = await ticketHistoryApi.sort(ID, sort.col, sortOrder(), {
        _limit: pagination.limit,
        _page: pagination.page,
      });
      const converted = convertTicketHistoriesPropertyToString(response.data);
      setTicketHistories(converted);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
  }, [pagination.page, sort.isAsc, sort.col, ID]);

  return {
    ticketHistories,
    setTicketHistories,
    pagination,
    setPagination,
    sorting,
    setTitleID,
  };
};

export default sortTicketHistories;
