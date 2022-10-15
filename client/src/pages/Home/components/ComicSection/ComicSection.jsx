/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import genreApi from "api/genreApi";
import CardList from "components/CardList";
import { getTitles } from "services/titleServices";
import styles from "../../assets/styles/ComicSection.module.scss";
import ComicActionSection from "./components/ComicActionSection";
import ComicFollowSection from "./components/ComicFollowSection";
import ComicRankingSection from "./components/ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const [genres, setGenres] = useState([]);
  const { titles } = getTitles();
  const hasData = genres.length > 0 && titles.length > 0;
  const top5 = hasData && titles.filter((title) => title.rank <= 5);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await genreApi.getAll({ _limit: 3, _page: 1 });
        setGenres(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchGenres();
  }, []);

  const fillTitlesByGenre = (genreID) => {
    const data = titles.filter((title) => title.genreId.includes(genreID));
    return data;
  };

  return (
    <>
      {hasData && (
        <>
          <ComicFollowSection
            titles={fillTitlesByGenre(genres[0].id).slice(0, 6)}
            headTitle={genres[0].genre}
          />
          {genres.slice(2).map((genr) => {
            const data = fillTitlesByGenre(genr.id);

            return (
              <section key={genr.id}>
                <Container className={cx("section")}>
                  <CardList
                    col={{ sm: 2 }}
                    data={data.slice(0, 6)}
                    headTitle={genr.genre}
                  />
                </Container>
              </section>
            );
          })}
          <ComicActionSection
            titles={fillTitlesByGenre(genres[1].id).slice(0, 3)}
            headTitle={genres[1].genre}
          />
          <ComicRankingSection top5={top5} />
        </>
      )}
      {}
    </>
  );
}

export default ComicSection;
