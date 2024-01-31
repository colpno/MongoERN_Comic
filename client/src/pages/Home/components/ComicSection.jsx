import classNames from "classnames/bind";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CardListWithTitle } from "components";
import { useGetGenres, useGetTitles } from "hooks/index.jsx";
import { setTop5Titles } from "libs/redux/slices/title.slice";
import styles from "../styles/ComicSection.module.scss";
import ComicRankingSection from "./ComicRankingSection";

const cx = classNames.bind(styles);

function ComicSection() {
  const dispatch = useDispatch();
  const { data: genres = {} } = useGetGenres({
    _sort: {
      _id: 1,
    },
    _limit: 4,
  });
  const allGenreNames = genres.data?.map((genre) => genre.name);
  const titlesQueryParams = {
    genres_in: allGenreNames,
    _sort: {
      like: -1,
      view: -1,
    },
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
      { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
    ]),
  };
  const { data: titles = [] } = useGetTitles(titlesQueryParams, false);
  const [top5, setTop5] = useState([]);

  const titlesByGenre = useMemo(() => {
    return genres.data?.map((genre, genreIndex) => {
      let count = 0;
      const limit = genreIndex !== genres.data.length - 1 ? 6 : 3;
      const temp = [];
      const titleLength = titles?.length || 0;

      for (let i = 0; i < titleLength; i++) {
        const title = titles[i];

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
  }, [titles, genres]);

  useEffect(() => {
    if (titles.length > 0) {
      const top5Titles = titles.slice(0, 5);
      setTop5(top5Titles);
      dispatch(setTop5Titles(top5Titles));
    }
  }, [titles]);

  const handleScroll = useCallback(() => {
    const rows = document.querySelectorAll(".comic-animation");
    if (rows.length > 0) {
      rows[0].style.opacity = `${1 - +window.scrollY / 700}`;
      rows[0].style.scale = `${1 - +window.scrollY / 5000}`;
      rows[1].style.transform = `translateY(${(+window.scrollY / 300) * -50}px)`;
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
