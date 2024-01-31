import classNames from "classnames/bind";
import { useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { CardListWithTitle } from "components";
import { CONTENT_LIST_TITLES_PER_PAGE } from "constants/paginate.constant";
import { useGetGenre, useInfinitePagination, useLazyGetTitles } from "hooks";
import styles from "./ContentList.module.scss";

const cx = classNames.bind(styles);

function ContentList() {
  const { genreId } = useParams();
  const { setPaginationTotal, setLastElementRef } = useInfinitePagination(
    CONTENT_LIST_TITLES_PER_PAGE
  );
  const { data: genre = {}, isSuccess: isGetGenreSuccess } = useGetGenre(genreId);
  const { get: getTitles, data: titles = [] } = useLazyGetTitles();

  const data = useMemo(
    () => ({
      name: genre.name,
      titles: titles.data,
    }),
    [genre, titles]
  );

  useEffect(() => {
    if (isGetGenreSuccess && genre) {
      getTitles({
        params: {
          genres_in: genre.name,
          _limit: CONTENT_LIST_TITLES_PER_PAGE,
          _embed: JSON.stringify([
            { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
            { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
          ]),
        },
        isPrivate: false,
      })
        .unwrap()
        .then((response) => {
          setPaginationTotal(response.pagination.total);
        });
    }
  }, [isGetGenreSuccess, genre]);

  return (
    <Container className={cx("content-list-page")}>
      {!!data?.name && data?.titles?.length > 0 ? (
        <CardListWithTitle data={data} col={{ xs: 6, sm: 3, lg: 2 }} dropRow={false} />
      ) : null}
      <div ref={setLastElementRef} />
    </Container>
  );
}

export default ContentList;
