import { useLazyGetChapterQuery } from "api/chapter.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useLazyGetChapter(params) {
  const dispatch = useDispatch();
  const [get, response] = useLazyGetChapterQuery(params);
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { get, ...response };
}

export default useLazyGetChapter;
