import titleApi from "api/titleApi";
import { useEffect, useState } from "react";

const sortTitles = (col, isAsc, limit = 50, userID = null) => {
  const hasUserID = !!userID;
  const [titles, setTitles] = useState([]);
  const [sort, setSort] = useState({ isAsc, col });
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const sorting = (column) => {
    setSort({ isAsc: !sort.isAsc, col: column });
  };

  const sortOrder = () => (sort.isAsc ? "asc" : "desc");

  const normalSort = async () => {
    try {
      const response = await titleApi.sort(sort.col, sortOrder(), {
        _limit: pagination.limit,
        _page: pagination.page,
      });
      setTitles(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  const sortByUserID = async () => {
    try {
      const response = await titleApi.sortByUserID(
        userID,
        sort.col,
        sortOrder(),
        {
          _limit: pagination.limit,
          _page: pagination.page,
        }
      );
      setTitles(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    hasUserID ? sortByUserID() : normalSort();
  }, [pagination.page, sort.isAsc, sort.col]);

  return {
    titles,
    setTitles,
    pagination,
    setPagination,
    sorting,
  };
};

export default sortTitles;
