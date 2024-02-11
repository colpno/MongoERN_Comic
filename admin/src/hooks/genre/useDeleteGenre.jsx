import { useDeleteGenreMutation } from "api/genre.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeleteGenre() {
  const dispatch = useDispatch();
  const [del, response] = useDeleteGenreMutation();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { del, ...response };
}

export default useDeleteGenre;
