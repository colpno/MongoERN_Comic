import { useDispatch } from "react-redux";

import { useResetPasswordMutation } from "api/auth.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetPassword, response] = useResetPasswordMutation();
  const { isFetching, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { resetPassword, ...response };
}

export default useResetPassword;
