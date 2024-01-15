import { useEffect, useState } from "react";
import userService from "services/user.service";

function useGetAllUsers(queryParams) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await userService.getAll(queryParams);
      setUsers(result.data);
    })();
  }, [queryParams]);

  return { users };
}

export default useGetAllUsers;
