import { useDeleteUserMutation } from "api/user.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeleteUser() {
  const dispatch = useDispatch();
  const [del, response] = useDeleteUserMutation();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) dispatch(setLoading(true));
    else dispatch(setLoading(false));
  }, [isLoading]);

  return { del, ...response };
}

export default useDeleteUser;
