import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { convertUsersPropertyToString } from "utils/convertArrayPropertyToString";

const sortUsers = (col, isAsc = true, limit = 50) => {
  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState({ isAsc, col });
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const sortOrder = () => (sort.isAsc ? "asc" : "desc");

  const sorting = (column) => {
    setSort({ isAsc: !sort.isAsc, col: column });
  };

  const normalSort = async () => {
    try {
      const response = await userApi.sort(sort.col, sortOrder(), {
        limit: pagination.limit,
        page: pagination.page,
      });
      const converted = convertUsersPropertyToString(response.data);
      setUsers(converted);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
  }, [pagination.page, sort.isAsc, sort.col]);

  return {
    users,
    setUsers,
    pagination,
    setPagination,
    sorting,
  };
};

export default sortUsers;