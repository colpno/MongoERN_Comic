import { useAddObjectStatusMutation } from "api/objectStatus.api.js";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddObjectStatus() {
  const dispatch = useDispatch();
  const [add, response] = useAddObjectStatusMutation();
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

export default useAddObjectStatus;
