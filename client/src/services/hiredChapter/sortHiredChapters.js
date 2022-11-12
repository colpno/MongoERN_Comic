import hiredChapterApi from "api/hiredChapterApi";
import { useEffect, useState } from "react";

const sortHiredChapters = (titleID, col, isAsc = true, limit = 50) => {
  const [hiredChapters, setHiredChapters] = useState([]);
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
      const response = await hiredChapterApi.sort(ID, sort.col, sortOrder(), {
        limit: pagination.limit,
        page: pagination.page,
      });
      setHiredChapters(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
  }, [pagination.page, sort.isAsc, sort.col, ID]);

  return {
    hiredChapters,
    setHiredChapters,
    pagination,
    setPagination,
    sorting,
    setTitleID,
  };
};

export default sortHiredChapters;
