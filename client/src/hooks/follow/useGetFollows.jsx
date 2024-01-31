import { useDispatch } from "react-redux";
import { useGetFollowsQuery } from "api/follow.api.js";
import { useEffect } from "react";
import { setLoading } from "libs/redux/slices/common.slice.js";

function useGetFollows(params) {
  const dispatch = useDispatch();
  const response = useGetFollowsQuery(params);
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return response;
}

export default useGetFollows;
