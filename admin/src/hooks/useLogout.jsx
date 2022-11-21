import authApi from "api/authApi";
import { logout } from "libs/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function useLogout(redirectTo) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(logout());
      navigate(redirectTo);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { logout: handleLogout };
}

export default useLogout;
