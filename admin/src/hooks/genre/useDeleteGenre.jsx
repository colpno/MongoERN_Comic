import { useDeleteGenreMutation } from "api/genre.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeleteGenre() {
  const dispatch = useDispatch();
  const [del, response] = useDeleteGenreMutation();
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { del, ...response };
}

export default useDeleteGenre;
