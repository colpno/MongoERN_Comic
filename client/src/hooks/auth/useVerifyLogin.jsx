import { useDispatch } from "react-redux";

import { useVerifyLoginMutation } from "api/auth.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { setUser } from "libs/redux/slices/user.slice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function useVerifyLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyLogin, response] = useVerifyLoginMutation();
  const { isFetching, data, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      const { cookie, ...others } = data;
      dispatch(setUser(others));
      Cookies.set(cookie.name, cookie.payload, cookie.options);
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { verifyLogin, ...response };
}

export default useVerifyLogin;
