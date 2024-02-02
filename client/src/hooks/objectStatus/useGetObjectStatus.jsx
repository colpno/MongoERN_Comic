import { useGetObjectStatusQuery } from "api/objectStatus.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetObjectStatus(params) {
  const dispatch = useDispatch();
  const response = useGetObjectStatusQuery(params);
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

export default useGetObjectStatus;
