import { useAddChapterTransactionMutation } from "api/chapterTransaction.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeleteChapter() {
  const dispatch = useDispatch();
  const [add, response] = useAddChapterTransactionMutation();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { add, ...response };
}

export default useDeleteChapter;
