import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { convertUsersPropertyToString } from "utils/convertArrayPropertyToString";

const sortUsersByProperty = (property, col, isAsc = true, limit = 50) => {
  const [users, setUsers] = useState([]);
  const [sortInfo, setSortInfo] = useState({ isAsc, col });
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const sortOrder = () => (sortInfo.isAsc ? "asc" : "desc");

  const sorting = (column) => {
    setSortInfo({ isAsc: !sortInfo.isAsc, col: column });
  };

  const fetchUser = async () => {
    try {
      const response = await userApi.sort(property, sortInfo.col, sortOrder(), {
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
    fetchUser();
  }, [pagination.page, sortInfo.isAsc, sortInfo.col]);

  return {
    users,
    setUsers,
    pagination,
    setPagination,
    sorting,
    fetchUser,
  };
};

export default sortUsersByProperty;
