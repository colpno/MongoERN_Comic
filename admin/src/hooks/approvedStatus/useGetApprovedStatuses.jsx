import { useGetApprovedStatusesQuery } from "api/approvedStatus.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetApprovedStatuses(params) {
  const dispatch = useDispatch();
  const response = useGetApprovedStatusesQuery(params);
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

export default useGetApprovedStatuses;
