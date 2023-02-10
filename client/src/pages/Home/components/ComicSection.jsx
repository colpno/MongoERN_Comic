import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CardListWithTitle } from "components";
import { setTop5Titles } from "libs/redux/slices/title.slice";
import { genreService, titleService } from "services";
import styles from "../styles/ComicSection.module.scss";
import ComicRankingSection from "./ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [titles, setTitles] = useState({ top5: [], approvedTitles: [] });
  const [titlesByGenre, setTitlesByGenre] = useState([]);

  const getConfirmedTitles = (array) => {
    const confirmedTitles = array.filter(
      (title) => title.approved_status_id.code === "apd" && title.status_id.code === "vis"
    );

    return confirmedTitles;
  };

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
    const top5QueryParams = {
      _sort: "like",
      _order: "desc",
      _limit: 5,
      _embed: JSON.stringify([
        { collection: "approved_status_id", fields: "-_id code" },
        { collection: "status_id", fields: "-_id code" },
      ]),
      _fields: "-__v -_guid -cover.cloud_public_id",
    };
    const genresQueryParams = {
      _sort: "_id",
      _order: "asc",
      _limit: 4,
    };

    const top5Promise = titleService.getAll(top5QueryParams, false);
    const genresPromise = genreService.getAll(genresQueryParams);

    Promise.all([top5Promise, genresPromise])
      .then(([top5Response, genresResponse]) => {
        const top5 = getConfirmedTitles(top5Response.data);

        const allGenres = genresResponse.data.map((genre) => genre.name);

        const titlesQueryParams = {
          genres_in: allGenres,
          _embed: JSON.stringify([
            { collection: "approved_status_id", fields: "-_id code" },
            { collection: "status_id", fields: "-_id code" },
          ]),
          _fields: "-__v -_guid -cover.cloud_public_id",
        };
        titleService.getAll(titlesQueryParams, false).then((titleResponse) => {
          const approvedTitles = getConfirmedTitles(titleResponse.data);

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
                <Row key={genre._id} className={cx("comic", `comic-${index + 1}`)}>
                  <section>
                    <CardListWithTitle col={responsive} data={titlesByGenre[index]} />
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
