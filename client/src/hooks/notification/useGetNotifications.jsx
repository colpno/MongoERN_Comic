import { useGetNotificationsQuery } from "api/notification.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetNotifications(params) {
  const dispatch = useDispatch();
  const response = useGetNotificationsQuery(params);
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

export default useGetNotifications;
