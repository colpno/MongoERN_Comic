import { useAddApprovedStatusMutation } from "api/approvedStatus.api.js";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddApprovedStatus() {
  const dispatch = useDispatch();
  const [add, response] = useAddApprovedStatusMutation();
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

export default useAddApprovedStatus;
