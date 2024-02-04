import { useDeleteNotificationMutation } from "api/notification.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeleteNotification() {
  const dispatch = useDispatch();
  const [del, response] = useDeleteNotificationMutation();
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { del, ...response };
}

export default useDeleteNotification;
