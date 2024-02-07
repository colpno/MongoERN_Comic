import { useDeleteObjectStatusMutation } from "api/objectStatus.api.js";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeleteObjectStatus() {
  const dispatch = useDispatch();
  const [del, response] = useDeleteObjectStatusMutation();
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

export default useDeleteObjectStatus;
