import { useGetUsersQuery } from "api/user.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetUsers(params) {
  const dispatch = useDispatch();
  const response = useGetUsersQuery(params);
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return {
    ...response,
    data: response.data ?? [],
  };
}

export default useGetUsers;
