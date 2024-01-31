import { useDispatch } from "react-redux";
import { useDeleteFollowMutation } from "api/follow.api.js";
import { useEffect } from "react";
import { setLoading } from "libs/redux/slices/common.slice.js";

function useDeleteFollow(params) {
  const dispatch = useDispatch();
  const [del, response] = useDeleteFollowMutation(params);
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { del, ...response };
}

export default useDeleteFollow;
