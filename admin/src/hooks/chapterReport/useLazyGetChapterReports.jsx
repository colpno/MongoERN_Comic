import { useLazyGetChapterReportsQuery } from "api/chapterReport.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetChapterReports(params) {
  const dispatch = useDispatch();
  const [get, response] = useLazyGetChapterReportsQuery(params);
  const { isFetching, data } = response;

  if (data?.pagination) {
    response.pagination = data.pagination;
    response.data = data.data;
  }

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { get, ...response, data: response.data ?? [] };
}

export default useGetChapterReports;
