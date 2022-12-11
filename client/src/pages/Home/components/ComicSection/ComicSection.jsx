import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import genreApi from "api/genreApi";
import titleGenreApi from "api/titleGenreApi";
import CardList from "components/CardList";
import { getAllTitles } from "services/title";
import { sortArray } from "utils/arrayMethods";
import styles from "../../assets/styles/ComicSection.module.scss";
import ComicFollowSection from "./components/ComicFollowSection";
import ComicActionSection from "./components/ComicActionSection";
import ComicRankingSection from "./components/ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const [genres, setGenres] = useState([]);
  const [titleGenre, setTitleGenre] = useState([]);
  const { titles } = getAllTitles({
    approvedStatusId: "6cbc2179-d24c-4097-abe9-320e4ae6c4ca",
  });
  const hasData = genres?.length > 0 && titles?.length > 0;
  const ranking = hasData && sortArray(titles, "like", "desc");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await genreApi.getAll({ limit: 3, page: 1 });
        setGenres(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await titleGenreApi.getAll();
        setTitleGenre(response);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchGenres();
  }, []);

  const fillTitlesByGenre = (genreID) => {
    const data = titleGenre.filter((temp) => {
      if (temp.genreId.includes(genreID)) return temp;
      return "";
    });

    const temp = data.map((asd) => {
      return titles.find((title) => {
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

  return (
    <>
      {hasData && (
        <>
          <ComicFollowSection
            titles={fillTitlesByGenre(genres[0].guid)}
            headTitle={genres[0].name}
          />
          {genres.slice(2).map((genr) => {
            const data = fillTitlesByGenre(genr.guid);

            return (
              <section key={genr.guid}>
                <Container className={cx("section")}>
                  <CardList col={{ xs: 2 }} data={data} headTitle={genr.name} />
                </Container>
              </section>
            );
          })}
          <ComicActionSection
            titles={fillTitlesByGenre(genres[1].guid).slice(0, 3)}
            headTitle={genres[1].name}
          />
          <ComicRankingSection top5={ranking.slice(0, 5)} />
        </>
      )}
      {}
    </>
  );
}

export default ComicSection;
