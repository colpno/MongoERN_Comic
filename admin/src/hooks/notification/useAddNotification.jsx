import { useAddNotificationMutation } from "api/notification.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddNotification() {
  const dispatch = useDispatch();
  const [add, response] = useAddNotificationMutation();
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { add, ...response };
}

export default useAddNotification;
