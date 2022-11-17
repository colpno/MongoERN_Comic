import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const sortTitles = (col, isAsc, limit = 50) => {
  const [titles, setTitles] = useState([]);
  const [sortInfo, setSortInfo] = useState({ isAsc, col });
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const sorting = (column) => {
    setSortInfo({ isAsc: !sortInfo.isAsc, col: column });
  };

  const sortOrder = () => (sortInfo.isAsc ? "asc" : "desc");

  const sort = async () => {
    try {
      const response = await titleApi.sort(sortInfo.col, sortOrder(), {
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
    sort();
  }, [pagination.page, sortInfo.isAsc, sortInfo.col]);

  return {
    titles,
    setTitles,
    pagination,
    setPagination,
    sorting,
    refetch: sort,
  };
};

export default sortTitles;
