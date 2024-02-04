import { useGetChapterTransactionsQuery } from "api/chapterTransaction.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetChapterTransactions(params) {
  const dispatch = useDispatch();
  const response = useGetChapterTransactionsQuery(params);
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

  return {
    ...response,
    data: response.data ?? [],
  };
}

export default useGetChapterTransactions;
