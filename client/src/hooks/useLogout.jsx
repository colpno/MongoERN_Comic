import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "libs/redux/slices/userSlice";
import { authService } from "services";

function useLogout(redirectTo) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate(redirectTo);
      })
      .catch((error) => console.error(error));
  };

  return { logout: handleLogout };
}

export default useLogout;
