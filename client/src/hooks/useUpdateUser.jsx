import { setUser } from "libs/redux/slices/user.slice.js";
import { useDispatch } from "react-redux";
import userService from "services/user.service.js";

function useUpdateUser() {
  const dispatch = useDispatch();

  const updateClientUser = (newData) => {
    dispatch(setUser(newData));
  };

  const updateUser = (newData) => {
    userService.update(newData).then((response) => {
      updateClientUser(response.data);
    });
  };

  return { updateUser, updateClientUser };
}

export default useUpdateUser;
