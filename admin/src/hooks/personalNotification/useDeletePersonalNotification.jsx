import { useDeletePersonalNotificationMutation } from "api/personalNotification.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeletePersonalNotification() {
  const dispatch = useDispatch();
  const [del, response] = useDeletePersonalNotificationMutation();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { del, ...response };
}

export default useDeletePersonalNotification;
