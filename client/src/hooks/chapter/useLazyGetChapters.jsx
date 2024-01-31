import { useLazyGetChaptersQuery } from "api/chapter.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useLazyGetChapters() {
  const dispatch = useDispatch();
  const [get, response] = useLazyGetChaptersQuery();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { get, ...response };
}

export default useLazyGetChapters;
