import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { convertUserPropertyToString } from "utils/convertArrayPropertyToString";

const getUserByID = (ID) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getOneByID(ID);
        const converted = convertUserPropertyToString(response);
        setUser(converted);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchUsers();
  }, []);

  return { user, setUser };
};

export default getUserByID;
