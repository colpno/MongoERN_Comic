import coinHistoryApi from "api/coinHistoryApi";
import { useEffect, useState } from "react";
import { convertCoinHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const sortCoinHistories = (titleID, col, isAsc = true, limit = 50) => {
  const [coinHistories, setCoinHistories] = useState([]);
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
      const response = await coinHistoryApi.sort(ID, sort.col, sortOrder(), {
        limit: pagination.limit,
        page: pagination.page,
      });
      const converted = convertCoinHistoriesPropertyToString(response.data);
      setCoinHistories(converted);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
  }, [pagination.page, sort.isAsc, sort.col, ID]);

  return {
    coinHistories,
    setCoinHistories,
    pagination,
    setPagination,
    sorting,
    setTitleID,
  };
};

export default sortCoinHistories;
