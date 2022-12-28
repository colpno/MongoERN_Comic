import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { CardListWithTitle } from "components";
import { genreService, titleService } from "services";
import styles from "./ContentList.module.scss";

const cx = classNames.bind(styles);

function ContentList() {
  const { genreId } = useParams();
  const [titles, setTitles] = useState([]);
  const [genre, setGenre] = useState({});

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
          .getAll({ genres_in: genreResponse.data.name })
          .then((titleResponse) => setTitles(titleResponse.data))
          .catch((titleError) => console.log(titleError));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container className={cx("content-list-page")}>
      {!!data.name && data.titles.length > 0 ? (
        <CardListWithTitle data={data} col={{ xs: 6, sm: 3, lg: 2 }} />
      ) : null}
    </Container>
  );
}

export default ContentList;
