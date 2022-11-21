import pointHistoryApi from "api/pointHistoryApi";
import { useEffect, useState } from "react";
import { convertPointHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const sortPointHistories = (titleID, col, isAsc = true, limit = 50) => {
  const [pointHistories, setPointHistories] = useState([]);
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
      const response = await pointHistoryApi.sort(ID, sort.col, sortOrder(), {
        limit: pagination.limit,
        page: pagination.page,
      });
      const converted = convertPointHistoriesPropertyToString(response.data);
      setPointHistories(converted);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
  }, [pagination.page, sort.isAsc, sort.col, ID]);

  return {
    pointHistories,
    setPointHistories,
    pagination,
    setPagination,
    sorting,
    setTitleID,
  };
};

export default sortPointHistories;
