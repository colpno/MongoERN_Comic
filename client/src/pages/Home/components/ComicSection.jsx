import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CardListWithTitle } from "components";
import { setTop5Titles } from "libs/redux/slices/titleSlice";
import { genreService, titleService } from "services";
import styles from "../styles/ComicSection.module.scss";
import ComicRankingSection from "./ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [titles, setTitles] = useState({ top5: [], approvedTitles: [] });
  const [titlesByGenre, setTitlesByGenre] = useState([]);

  useEffect(() => {
    const genreLength = genres.length;
    const data = genres.map((genre, genreIndex) => {
      let count = 0;
      const limit = genreIndex !== genreLength - 1 ? 6 : 3;
      const temp = [];
      const titleLength = titles.approvedTitles.length;

      for (let i = 0; i < titleLength; i++) {
        const title = titles.approvedTitles[i];

        if (title.genres.includes(genre.name)) {
          temp.push(title);

          count += 1;
          if (count >= limit) break;
        }
      }

      return {
        _id: genre._id,
        name: genre.name,
        titles: temp,
      };
    });

    setTitlesByGenre(data);
  }, [titles.approvedTitles, genres]);

  useEffect(() => {
    const top5Promise = titleService.getAll({
      _sort: "like",
      _order: "desc",
      _limit: 5,
    });
    const genresPromise = genreService.getAll({
      _sort: "_id",
      _order: "asc",
      _limit: 4,
    });

    Promise.all([top5Promise, genresPromise])
      .then(([top5Response, genresResponse]) => {
        const top5 = top5Response.data;

        const allGenres = genresResponse.data.map((genre) => genre.name);

        titleService.getAll({ genres_in: allGenres }).then((titleResponse) => {
          const approvedTitles = titleResponse.data;

          setTitles({ top5, approvedTitles });
        });

        setGenres(genresResponse.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    titles.top5.length > 0 && dispatch(setTop5Titles(titles.top5));
  }, [titles.top5]);

  return (
    <>
      <Container>
        <Row>
          <h1 className={cx("title", "line-clamp")}>Comic</h1>
        </Row>
        {titlesByGenre.length > 0 && (
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
                <Row
                  key={genre._id}
                  className={cx("comic", `comic-${index + 1}`)}
                >
                  <section>
                    <CardListWithTitle
                      col={responsive}
                      data={titlesByGenre[index]}
                    />
                  </section>
                </Row>
              );
            })}
          </>
        )}
      </Container>
      {titles.top5.length > 0 && <ComicRankingSection top5={titles.top5} />}
    </>
  );
}

export default ComicSection;
