import { useDispatch } from "react-redux";
import { useLoginMutation } from "api/auth.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { setLoginInfo } from "libs/redux/slices/login.slice.js";
import { useEffect } from "react";
import Cookies from "js-cookie";

function useLogin() {
  const dispatch = useDispatch();
  const [login, response] = useLoginMutation();
  const { isLoading, data, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLoginInfo(data.data));
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

  return { login, ...response };
}

export default useLogin;
