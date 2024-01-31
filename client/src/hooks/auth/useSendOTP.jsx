import { useDispatch } from "react-redux";

import { useSendOTPMutation } from "api/auth.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { setLoginInfo } from "libs/redux/slices/login.slice.js";
import { useEffect } from "react";

function useSendOTP() {
  const dispatch = useDispatch();
  const [sendOTP, response] = useSendOTPMutation();
  const { isFetching, data, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLoginInfo(data.data));
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
