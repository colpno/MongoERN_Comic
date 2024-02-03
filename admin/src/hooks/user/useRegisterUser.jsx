import { useRegisterUserMutation } from "api/user.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useRegisterUser() {
  const dispatch = useDispatch();
  const [register, response] = useRegisterUserMutation();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { register, ...response };
}

export default useRegisterUser;
