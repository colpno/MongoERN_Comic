import { useDispatch } from "react-redux";

import { useSendOTPMutation } from "api/auth.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { setLoginInfo } from "libs/redux/slices/login.slice.js";
import { useEffect } from "react";
import Cookies from "js-cookie";

function useSendOTP() {
  const dispatch = useDispatch();
  const [sendOTP, response] = useSendOTPMutation();
  const { isFetching, data, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLoginInfo(data.data));
      Cookies.set(data.data.cookie.name, data.data.cookie.payload, data.data.cookie.options);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { sendOTP, ...response };
}

export default useSendOTP;
