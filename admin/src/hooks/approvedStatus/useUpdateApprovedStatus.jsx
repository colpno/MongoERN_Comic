import { useUpdateApprovedStatusMutation } from "api/approvedStatus.api.js";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useUpdateApprovedStatus() {
  const dispatch = useDispatch();
  const [update, response] = useUpdateApprovedStatusMutation();
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

export default useUpdateApprovedStatus;
