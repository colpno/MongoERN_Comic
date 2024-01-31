import { useUpdateTitleMutation } from "api/title.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useUpdateTitle() {
  const dispatch = useDispatch();
  const [update, response] = useUpdateTitleMutation();
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

export default useUpdateTitle;
