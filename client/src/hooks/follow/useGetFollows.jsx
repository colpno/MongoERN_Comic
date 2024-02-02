import { useDispatch } from "react-redux";
import { useGetFollowsQuery } from "api/follow.api.js";
import { useEffect } from "react";
import { setLoading } from "libs/redux/slices/common.slice.js";

function useGetFollows(params) {
  const dispatch = useDispatch();
  const response = useGetFollowsQuery(params);
  const { isFetching, data } = response;

  if (data?.pagination) {
    response.pagination = data.pagination;
    response.data = data.data;
  }

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return response;
}

export default useGetFollows;
