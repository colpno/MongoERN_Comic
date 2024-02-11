import { useAddObjectStatusMutation } from "api/objectStatus.api.js";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddObjectStatus() {
  const dispatch = useDispatch();
  const [add, response] = useAddObjectStatusMutation();
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

export default useAddObjectStatus;
