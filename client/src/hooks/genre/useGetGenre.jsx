import { useGetGenreQuery } from "api/genre.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetGenre(id, params = {}) {
  const dispatch = useDispatch();
  const response = useGetGenreQuery({ id, params });
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return response;
}

export default useGetGenre;
