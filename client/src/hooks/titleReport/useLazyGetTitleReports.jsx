import { useLazyGetTitleReportsQuery } from "api/titleReport.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useLazyGetTitleReports() {
  const dispatch = useDispatch();
  const [get, response] = useLazyGetTitleReportsQuery();
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

export default useLazyGetTitleReports;
