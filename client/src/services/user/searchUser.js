import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { convertUserPropertyToString } from "utils/convertArrayPropertyToString";

const searchUser = (key, value) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.search({ [key]: value });
        const converted = convertUserPropertyToString(response);
        setUsers(converted);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchUsers();
  }, []);

  return { users, setUsers };
};

export default searchUser;
