import classNames from "classnames/bind";
import { useEffect, useMemo } from "react";
import { Slide } from "react-awesome-reveal";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CardListWithTitle } from "components";
import { useGetGenres, useGetTitles } from "hooks/index.jsx";
import { setTop5Titles } from "libs/redux/slices/title.slice";
import { sortTitlesByGenre } from "utils/sortTitlesByGenre.js";
import styles from "../styles/ComicSection.module.scss";
import ComicRankingSection from "./ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const dispatch = useDispatch();
  const { data: genres = [] } = useGetGenres({
    _sort: {
      _id: 1,
    },
    _limit: 4,
  });
  const allGenreNames = genres.map((genre) => genre.name);
  const { data: titles = [] } = useGetTitles(
    {
      genres_in: allGenreNames,
      _embed: JSON.stringify([
        { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
        { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
      ]),
    },
    false
  );
  const { data: top5 = [] } = useGetTitles(
    {
      _sort: {
        like: -1,
        view: -1,
      },
      _embed: JSON.stringify([
        { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
        { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
      ]),
    },
    false
  );
  const titlesByGenre = useMemo(() => sortTitlesByGenre(genres, titles), [genres, titles]);

  useEffect(() => {
    if (top5.length > 0) {
      dispatch(setTop5Titles(top5));
    }
  }, [top5]);

  return (
    <>
      <Container>
        {titlesByGenre?.length > 0 && (
          <>
            {titlesByGenre.map((genre, index) => {
              const responsive =
                index !== titlesByGenre.length - 1
                  ? { xs: 2 }
                  : {
                      xs: 10,
                      md: 7,
                      lg: 4,
                    };

              return (
                <Row key={genre._id} className={`${cx("comic", `comic-${index + 1}`)}`}>
                  <section>
                    <Slide direction="up" triggerOnce>
                      <CardListWithTitle col={responsive} data={titlesByGenre[index]} />
                    </Slide>
                  </section>
                </Row>
              );
            })}
          </>
        )}
      </Container>
      {top5.length > 0 && <ComicRankingSection top5={top5} />}
    </>
  );
}

export default ComicSection;
