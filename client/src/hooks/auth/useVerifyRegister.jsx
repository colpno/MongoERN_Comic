import { useDispatch } from "react-redux";

import { useVerifyRegisterMutation } from "api/auth.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useVerifyRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyRegister, response] = useVerifyRegisterMutation();
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

  return { verifyRegister, ...response };
}

export default useVerifyRegister;
