import { useAddNotificationMutation } from "api/notification.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddNotification() {
  const dispatch = useDispatch();
  const [add, response] = useAddNotificationMutation();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { add, ...response };
}

export default useAddNotification;
