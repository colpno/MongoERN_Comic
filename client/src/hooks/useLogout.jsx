import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "libs/redux/slices/user.slice";
import { authService } from "services";

function useLogout(redirectTo) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate(redirectTo);
    });
  };

  return { logout: handleLogout };
}

export default useLogout;
