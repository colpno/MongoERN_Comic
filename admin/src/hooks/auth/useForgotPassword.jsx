import { useDispatch } from "react-redux";

import { useForgotPasswordMutation } from "api/auth.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import Cookies from "js-cookie";

function useForgotPassword() {
  const dispatch = useDispatch();
  const [forgotPassword, response] = useForgotPasswordMutation();
  const { data, isLoading, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      Cookies.set(data.data.cookie.name, data.data.cookie.payload, data.data.cookie.options);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { forgotPassword, ...response };
}

export default useForgotPassword;
