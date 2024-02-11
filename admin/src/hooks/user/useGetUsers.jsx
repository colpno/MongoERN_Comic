import { useGetUsersQuery } from "api/user.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetUsers(params) {
  const dispatch = useDispatch();
  const response = useGetUsersQuery(params);
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return {
    ...response,
    data: response.data ?? [],
  };
}

export default useGetUsers;
