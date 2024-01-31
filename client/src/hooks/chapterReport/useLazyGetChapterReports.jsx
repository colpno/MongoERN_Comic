import { useLazyGetChapterReportsQuery } from "api/chapterReport.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetChapterReports(params) {
  const dispatch = useDispatch();
  const [get, response] = useLazyGetChapterReportsQuery(params);
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

export default useGetChapterReports;
