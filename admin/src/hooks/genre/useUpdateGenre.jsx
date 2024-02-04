import { useUpdateGenreMutation } from "api/genre.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useUpdateGenre() {
  const dispatch = useDispatch();
  const [update, response] = useUpdateGenreMutation();
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { update, ...response };
}

export default useUpdateGenre;
