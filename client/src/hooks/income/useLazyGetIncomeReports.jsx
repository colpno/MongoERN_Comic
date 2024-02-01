import { useLazyGetIncomeReportsQuery } from "api/income.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useLazyGetIncomeReports(params) {
  const dispatch = useDispatch();
  const [get, response] = useLazyGetIncomeReportsQuery(params);
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

export default useLazyGetIncomeReports;
