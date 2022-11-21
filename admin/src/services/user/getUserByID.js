import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { convertUserPropertyToString } from "utils/convertArrayPropertyToString";

const getUserByID = (id) => {
  const [user, setUser] = useState({});

  const fetchUsers = async (ID) => {
    try {
      const response = await userApi.getOneByID(ID);
      const converted = convertUserPropertyToString(response[0]);
      setUser(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    id && fetchUsers(id);
  }, []);

  return { user, setUser, refetch: fetchUsers };
};

export default getUserByID;
