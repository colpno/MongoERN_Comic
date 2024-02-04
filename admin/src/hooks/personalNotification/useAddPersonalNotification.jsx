import { useAddPersonalNotificationMutation } from "api/personalNotification.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddPersonalNotification() {
  const dispatch = useDispatch();
  const [add, response] = useAddPersonalNotificationMutation();
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

export default useAddPersonalNotification;
