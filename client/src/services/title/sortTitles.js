import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const sortTitles = (col, isAsc, limit = 50) => {
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
        limit: pagination.limit,
        page: pagination.page,
      });
      const converted = convertTitlesPropertyToString(response.data);
      setTitles(converted);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
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
