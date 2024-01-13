import classNames from "classnames/bind";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CardListWithTitle } from "components";
import { useToast } from "hooks";
import { setTop5Titles } from "libs/redux/slices/title.slice";
import { genreService, titleService } from "services";
import { sortArray } from "utils/arrayMethods";
import styles from "../styles/ComicSection.module.scss";
import ComicRankingSection from "./ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [titles, setTitles] = useState({ top5: [], approvedTitles: [] });
  const { toastEmitter } = useToast();

  const titlesByGenre = useMemo(() => {
    return genres.map((genre, genreIndex) => {
      let count = 0;
      const limit = genreIndex !== genres.length - 1 ? 6 : 3;
      const temp = [];
      const titleLength = titles.approvedTitles?.length || 0;

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
  }, [titles.approvedTitles, genres]);

  const fetchData = async () => {
    const genresQueryParams = {
      _sort: "_id",
      _order: "asc",
      _limit: 4,
    };

    try {
      const genresResult = await genreService.getAll(genresQueryParams);
      const allGenreNames = genresResult.data.map((genre) => genre.name);

      const titlesQueryParams = {
        genres_in: allGenreNames,
        _embed: JSON.stringify([
          { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
          { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
        ]),
      };

      const titleResult = await titleService.getAll(titlesQueryParams, false);
      const top5 = sortArray(titleResult.data, "like", "desc").slice(0, 5);

      setTitles({ top5, approvedTitles: titleResult.data });
      setGenres(genresResult.data);
    } catch (error) {
      toastEmitter(error, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    titles.top5.length > 0 && dispatch(setTop5Titles(titles.top5));
  }, [titles.top5]);

  const handleScroll = useCallback(() => {
    const rows = document.querySelectorAll(".comiccc");
    if (rows.length > 0) {
      rows[0].style.opacity = `${1 - +window.scrollY / 700}`;
      rows[0].style.scale = `${1 - +window.scrollY / 5000}`;
      rows[1].style.transform = `translateY(${(+window.scrollY / 300) * -100}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      handleScroll();
    });

    return () => {
      window.removeEventListener("scroll", () => {
        handleScroll();
      });
    };
  }, [handleScroll]);

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
                <Row key={genre._id} className={`${cx("comic", `comic-${index + 1}`)} comiccc`}>
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
