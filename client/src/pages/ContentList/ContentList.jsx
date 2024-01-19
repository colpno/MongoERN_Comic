import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { CardListWithTitle } from "components";
import { CONTENT_LIST_TITLES_PER_PAGE } from "constants/paginate.constant";
import { useInfinitePagination, useToast } from "hooks";
import { genreService, titleService } from "services";
import styles from "./ContentList.module.scss";

const cx = classNames.bind(styles);

function ContentList() {
  const { genreId } = useParams();
  const [titles, setTitles] = useState([]);
  const [genre, setGenre] = useState({});
  const { setPaginationTotal, setLastElementRef } = useInfinitePagination(
    CONTENT_LIST_TITLES_PER_PAGE
  );
  const { Toast, options, toastEmitter } = useToast();

  const data = useMemo(
    () => ({
      name: genre.name,
      titles,
    }),
    [genre, titles]
  );

  useEffect(() => {
    genreService
      .getOne(genreId)
      .then((genreResponse) => {
        setGenre(genreResponse.data);

        titleService
          .getAll(
            {
              genres_in: genreResponse.data.name,
              _limit: CONTENT_LIST_TITLES_PER_PAGE,
              _embed: JSON.stringify([
                { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
                { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
              ]),
            },
            false
          )
          .then((titleResponse) => {
            setTitles(titleResponse.data);
            setPaginationTotal(titleResponse.paginate.total);
          })
          .catch((titleError) => toastEmitter(titleError, "error"));
      })
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  return (
    <>
      <Container className={cx("content-list-page")}>
        {!!data.name && data.titles.length > 0 ? (
          <CardListWithTitle data={data} col={{ xs: 6, sm: 3, lg: 2 }} dropRow={false} />
        ) : null}
        <div ref={setLastElementRef} />
      </Container>
      <Toast {...options} />
    </>
  );
}

export default ContentList;
