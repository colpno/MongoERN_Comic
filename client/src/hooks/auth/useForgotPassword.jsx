import { useDispatch } from "react-redux";

import { useForgotPasswordMutation } from "api/auth.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";

function useForgotPassword() {
  const dispatch = useDispatch();
  const [forgotPassword, response] = useForgotPasswordMutation();
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { forgotPassword, ...response };
}

export default useForgotPassword;
