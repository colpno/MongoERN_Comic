import { useUpdateUserMutation } from "api/user.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { setUser } from "libs/redux/slices/user.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useUpdateUser() {
  const dispatch = useDispatch();
  const [update, response] = useUpdateUserMutation();
  const { isLoading, isSuccess, data } = response;
  const user = useSelector((state) => state.user.user);

  const updateClientUser = (newData) => {
    dispatch(setUser(newData));
  };

  useEffect(() => {
    if (isSuccess && data._id === user._id && data.username && user.username) {
      updateClientUser(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading) dispatch(setLoading(true));
    else dispatch(setLoading(false));
  }, [isLoading]);

  return { update, updateClientUser, ...response };
}

export default useUpdateUser;
