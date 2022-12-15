import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CardListWithTitle } from "components";
import { setTop5Titles } from "libs/redux/slices/titleSlice";
import { getAllGenres } from "services/genre";
import { getAllTitles } from "services/title";
import { getAllTitleGenres } from "services/titleGenre";
import { sortArray } from "utils/arrayMethods";
import styles from "../../assets/styles/ComicSection.module.scss";
import ComicActionSection from "./components/ComicActionSection";
import ComicFollowSection from "./components/ComicFollowSection";
import ComicRankingSection from "./components/ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [titles, setTitles] = useState({ top5: [], approvedTitles: [] });
  const [titleGenres, setTitleGenres] = useState([]);

  const getTop5Titles = (titleArray = []) => {
    const sortedTitles = sortArray(titleArray, "like", "asc");
    const top5 = sortedTitles.slice(0, 5);
    return top5;
  };

  const getApprovedTitles = (titleArray = []) => {
    const approvedTitles = titleArray.filter(
      (title) =>
        title.approvedStatusId === "6cbc2179-d24c-4097-abe9-320e4ae6c4ca"
    );
    return approvedTitles;
  };

  const fetchData = () => {
    const titlesPromise = getAllTitles();
    const genresPromise = getAllGenres({
      sort: "id",
      order: "asc",
      limit: 3,
      page: 1,
    });
    const titleGenresPromise = getAllTitleGenres();

    Promise.all([titlesPromise, genresPromise, titleGenresPromise])
      .then(([titlesResponse, genresResponse, titleGenresResponse]) => {
        const top5 = getTop5Titles(titlesResponse);
        const approvedTitles = getApprovedTitles(titlesResponse);

        setGenres(genresResponse.data);
        setTitleGenres(titleGenresResponse);
        setTitles({ top5, approvedTitles });
      })
      .catch((error) => console.log(error));
  };

  const filterTitlesByGenre = (genreID) => {
    const data = titleGenres.filter((titleGenre) =>
      titleGenre.genreId.includes(genreID)
    );

    const temp = data.map((asd) => {
      return titles.approvedTitles.find((title) => {
        return title.guid === asd.titleId;
      });
    });

    const result = [...temp];
    const myFilterArray = result.filter(Boolean);
    return myFilterArray.slice(
      0,
      myFilterArray.length > 6 ? 6 : myFilterArray.length
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    titles.top5.length > 0 && dispatch(setTop5Titles(titles.top5));
  }, [titles.top5]);

  return (
    <>
      {genres.length > 0 && (
        <>
          <ComicFollowSection
            titles={filterTitlesByGenre(genres[0].guid)}
            genre={genres[0]}
          />
          {genres.slice(2, 3).map((genr) => {
            const data = filterTitlesByGenre(genr.guid);

            return (
              <section key={genr.guid}>
                <Container className={cx("section")}>
                  <CardListWithTitle col={{ xs: 2 }} data={data} genre={genr} />
                </Container>
              </section>
            );
          })}
          <ComicActionSection
            titles={filterTitlesByGenre(genres[1].guid).slice(0, 3)}
            genre={genres[1]}
          />
        </>
      )}
      {titles.top5.length > 0 && <ComicRankingSection top5={titles.top5} />}
    </>
  );
}

export default ComicSection;
