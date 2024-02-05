import { useLazyLogoutQuery } from "api/auth.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { logout as resetClient } from "libs/redux/slices/user.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function useLazyLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, response] = useLazyLogoutQuery();
  const { isFetching, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetClient());
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

  return { logout, ...response };
}

export default useLazyLogout;
