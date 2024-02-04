import { useUpdateNotificationMutation } from "api/notification.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useUpdateNotification() {
  const dispatch = useDispatch();
  const [update, response] = useUpdateNotificationMutation();
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { update, ...response };
}

export default useUpdateNotification;
