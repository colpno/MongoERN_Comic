import { useLazyGetTitlesQuery } from "api/title.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useLazyGetTitles() {
  const dispatch = useDispatch();
  const [get, response] = useLazyGetTitlesQuery();
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

  return { get, ...response };
}

export default useLazyGetTitles;
