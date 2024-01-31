import { useGetTitlesQuery } from "api/title.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetTitles(params, isPrivate = true) {
  const dispatch = useDispatch();
  const response = useGetTitlesQuery({ params, isPrivate });
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return response;
}

export default useGetTitles;
