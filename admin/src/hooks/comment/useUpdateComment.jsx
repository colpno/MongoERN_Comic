import { useUpdateCommentMutation } from "api/comment.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useUpdateComment() {
  const dispatch = useDispatch();
  const [update, response] = useUpdateCommentMutation();
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

export default useUpdateComment;
