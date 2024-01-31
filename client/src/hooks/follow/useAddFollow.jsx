import { useDispatch } from "react-redux";
import { useAddFollowMutation } from "api/follow.api.js";
import { useEffect } from "react";
import { setLoading } from "libs/redux/slices/common.slice.js";

function useAddFollow() {
  const dispatch = useDispatch();
  const [add, response] = useAddFollowMutation();
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

export default useAddFollow;
