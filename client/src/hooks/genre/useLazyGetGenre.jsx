import { useLazyGetGenreQuery } from "api/genre.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useLazyGetGenre() {
  const dispatch = useDispatch();
  const [get, response] = useLazyGetGenreQuery();
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { get, ...response };
}

export default useLazyGetGenre;
