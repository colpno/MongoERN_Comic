import { useAddGenreMutation } from "api/genre.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddGenre() {
  const dispatch = useDispatch();
  const [add, response] = useAddGenreMutation();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { add, ...response };
}

export default useAddGenre;
