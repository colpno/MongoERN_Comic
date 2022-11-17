import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { convertUsersPropertyToString } from "utils/convertArrayPropertyToString";

const searchUser = (keyValuePairs) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await userApi.search(keyValuePairs);
      const converted = convertUsersPropertyToString(response);
      setUsers(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, setUsers };
};

export default searchUser;
