import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const sortTitlesByUserID = (userID, col, isAsc, limit = 50) => {
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

  const sortByUserID = async () => {
    try {
      const response = await titleApi.sortByUserID(
        userID,
        sort.col,
        sortOrder(),
        {
          limit: pagination.limit,
          page: pagination.page,
        }
      );
      const converted = convertTitlesPropertyToString(response.data);
      setTitles(converted);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    userID && sortByUserID();
  }, [pagination.page, sort.isAsc, sort.col]);

  return {
    titles,
    setTitles,
    pagination,
    setPagination,
    sorting,
  };
};

export default sortTitlesByUserID;
