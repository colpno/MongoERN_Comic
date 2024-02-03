import { useDispatch } from "react-redux";

import { useVerifyLoginMutation } from "api/auth.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { setUser } from "libs/redux/slices/user.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useVerifyLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyLogin, response] = useVerifyLoginMutation();
  const { isFetching, data, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
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
