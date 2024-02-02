import { useAddChapterTransactionMutation } from "api/chapterTransaction.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { setUser } from "libs/redux/slices/user.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddChapterTransaction() {
  const dispatch = useDispatch();
  const [add, response] = useAddChapterTransactionMutation();
  const { isLoading, isSuccess, data } = response;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { add, ...response };
}

export default useAddChapterTransaction;
