import { useMemo } from "react";
import { useGetGenres } from "./index.jsx";

function useGenreOptions() {
  const { data: genres = [] } = useGetGenres({ _fields: "-_id name" });

  const genreOptions = useMemo(
    () =>
      genres.map((genre) => {
        return { value: `${genre.name}`, label: genre.name };
      }),
    [genres]
  );

  return genreOptions;
}

export default useGenreOptions;
