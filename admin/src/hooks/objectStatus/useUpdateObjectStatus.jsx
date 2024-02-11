import { useUpdateObjectStatusMutation } from "api/objectStatus.api.js";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useUpdateObjectStatus() {
  const dispatch = useDispatch();
  const [update, response] = useUpdateObjectStatusMutation();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { update, ...response };
}

export default useUpdateObjectStatus;
