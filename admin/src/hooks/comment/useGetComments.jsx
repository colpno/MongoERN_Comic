import { useGetCommentsQuery } from "api/comment.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetComments(params) {
  const dispatch = useDispatch();
  const response = useGetCommentsQuery(params);
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

  return {
    ...response,
    data: response.data ?? [],
  };
}

export default useGetComments;
