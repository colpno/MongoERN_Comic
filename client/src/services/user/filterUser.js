import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { convertUsersPropertyToString } from "utils/convertArrayPropertyToString";

const filterUser = (property, limit) => {
  const [users, getUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit, total: 0 });

  const fetch = async (prop) => {
    try {
      const response = await userApi.filter(prop, {
        limit: pagination.limit,
        page: pagination.page,
      });
      const converted = convertUsersPropertyToString(response.data);
      getUsers(converted);
      setPagination((prev) => ({ ...prev, total: response.pagination.total }));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    property && fetch(property);
  }, []);

  return { users, getUsers, fetch };
};

export default filterUser;
