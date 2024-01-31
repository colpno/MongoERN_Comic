import { useUpdateUserMutation } from "api/user.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { setUser } from "libs/redux/slices/user.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useUpdateUser() {
  const dispatch = useDispatch();
  const [update, response] = useUpdateUserMutation();
  const { isLoading, isSuccess, data } = response;

  const updateClientUser = (newData) => {
    dispatch(setUser(newData));
  };

  useEffect(() => {
    if (isSuccess) updateClientUser(data);
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading) dispatch(setLoading(true));
    else dispatch(setLoading(false));
  }, [isLoading]);

  return { update, updateClientUser, ...response };
}

export default useUpdateUser;
