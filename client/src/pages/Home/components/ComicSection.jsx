import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CardListWithTitle } from "components";
import { setTop5Titles } from "libs/redux/slices/titleSlice";
import { genreService, titleService } from "services";
import { sortArray } from "utils/arrayMethods";
import styles from "../styles/ComicSection.module.scss";
import ComicRankingSection from "./ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [titles, setTitles] = useState({ top5: [], approvedTitles: [] });
  const [titlesByGenre, setTitlesByGenre] = useState([]);

  const getTop5Titles = (titleArray = []) => {
    const sortedTitles = sortArray(titleArray, "like", "asc");
    const top5 = sortedTitles.slice(0, 5);
    return top5;
  };

  const getApprovedTitles = (titleArray = []) => {
    const approvedTitles = titleArray.filter(
      (title) => title.approved_status_id === "63a6fb6216ee77053d6feb93"
    );
    return approvedTitles;
  };

  const fetchData = () => {
    const titlesPromise = titleService.getAll();
    const genresPromise = genreService.getAll({
      _sort: "_id",
      _order: "asc",
      _limit: 4,
      _page: 1,
    });

    Promise.all([titlesPromise, genresPromise])
      .then(([titlesResponse, genresResponse]) => {
        const top5 = getTop5Titles(titlesResponse.data);
        const approvedTitles = getApprovedTitles(titlesResponse.data);

        setGenres(genresResponse.data);
        setTitles({ top5, approvedTitles });
      })
      .catch((error) => console.error(error));
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
    fetchData();
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
